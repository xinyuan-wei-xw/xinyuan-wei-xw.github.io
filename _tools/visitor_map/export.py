"""Export geographic GA4 session aggregates; authentication stays in CI."""
import datetime as dt
import json
import math
import os
from pathlib import Path
import sys
import unicodedata
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[2]
PROPERTY = '554846099'
HOST = 'xinyuan-wei-xw.github.io'
NS = '{http://www.w3.org/2000/svg}'
ET.register_namespace('', NS[1:-1])


def request_body(by_country=True):
    body = {
        'dateRanges': [{'startDate': '29daysAgo', 'endDate': 'today'}],
        'metrics': [{'name': 'sessions'}],
        'dimensionFilter': {'andGroup': {'expressions': [
            {'filter': {'fieldName': 'hostName', 'stringFilter': {'matchType': 'EXACT', 'value': HOST}}},
            {'filter': {'fieldName': 'eventName', 'stringFilter': {'matchType': 'EXACT', 'value': 'page_view'}}},
            {'notExpression': {'filter': {'fieldName': 'pagePath', 'stringFilter': {'matchType': 'BEGINS_WITH', 'value': '/visitor-map'}}}}
        ]}},
        'limit': '1000',
    }
    if by_country:
        names = ['countryId', 'country']
        if by_country in ('regions', 'cities'):
            names += ['region']
        if by_country == 'cities':
            names += ['city']
        body['dimensions'] = [{'name': name} for name in names]
        body['limit'] = '100000'
    return body


def report(token, by_country):
    req = urllib.request.Request(
        f'https://analyticsdata.googleapis.com/v1beta/properties/{PROPERTY}:runReport',
        data=json.dumps(request_body(by_country)).encode(),
        headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'},
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        # Do not print response bodies, credentials, or raw analytics results.
        raise RuntimeError(f'GA4 request failed (HTTP {e.code}); check API and Viewer access.') from None


def count(row):
    n = int(row['metricValues'][0]['value'])
    if n < 0:
        raise ValueError('Invalid negative session count')
    return n


def aggregate(countries_report, total_report):
    rows = countries_report.get('rows', [])
    if countries_report.get('rowCount', 0) > len(rows):
        raise ValueError('Incomplete country report; refusing to publish truncated counts')
    countries = []
    for row in rows:
        code, name = [x['value'] for x in row['dimensionValues']]
        n = count(row)
        if n:
            countries.append({'code': code, 'name': name, 'sessions': n})
    countries.sort(key=lambda x: (-x['sessions'], x['name']))
    total_rows = total_report.get('rows', [])
    total = count(total_rows[0]) if total_rows else 0
    timezone = countries_report.get('metadata', {}).get('timeZone', 'America/New_York')
    today = dt.datetime.now(ZoneInfo(timezone)).date()
    return {
        'status': 'ready',
        'updated_at': dt.datetime.now(dt.timezone.utc).isoformat(timespec='seconds'),
        'start_date': (today - dt.timedelta(days=29)).isoformat(),
        'end_date': today.isoformat(),
        'timezone': timezone,
        'metric': 'sessions',
        'total_sessions': total,
        'countries': countries,
        'thresholded': any(r.get('metadata', {}).get('subjectToThresholding', False) for r in [countries_report, total_report]),
    }


def normalized(value):
    return ''.join(c for c in unicodedata.normalize('NFKD', value or '').lower() if c.isalnum())


def detailed_rows(response, cities=False):
    rows = response.get('rows', [])
    if response.get('rowCount', 0) > len(rows):
        raise ValueError('Incomplete geography report; refusing to publish truncated counts')
    coordinates = json.loads((ROOT / '_tools/visitor_map/city-coordinates.json').read_text()) if cities else []
    index = {}
    for place in coordinates:
        for name in place['names']:
            index.setdefault((place['country'], normalized(name)), []).append(place)
    output = []
    for row in rows:
        values = [d['value'] for d in row['dimensionValues']]
        n = count(row)
        if not n:
            continue
        item = {'country': values[0], 'country_name': values[1], 'region': values[2], 'sessions': n}
        if cities:
            item['city'] = values[3]
            matches = index.get((values[0], normalized(values[3])), [])
            # Match both country and state/province. Never guess an ambiguous city.
            matches = [p for p in matches if normalized(p['region']) == normalized(values[2])]
            unique = {(p['lon'], p['lat']) for p in matches}
            if len(unique) == 1:
                lon, lat = unique.pop()
                item['location'] = {'longitude': lon, 'latitude': lat}
        output.append(item)
    return sorted(output, key=lambda x: (-x['sessions'], x.get('city', x['region'])))


def render_svg(data):
    tree = ET.parse(ROOT / '_tools/visitor_map/world.svg')
    root = tree.getroot()
    by_code = {c['code']: c for c in data['countries']}
    palette = ['#acc5e8', '#7ca3d4', '#4679bd', '#245aa8', '#0039a6']
    maximum = max([c['sessions'] for c in data['countries']] or [1])
    for path in root.iter(NS + 'path'):
        c = by_code.get(path.get('data-country'))
        n = c['sessions'] if c else 0
        if n:
            level = min(4, int(4 * math.log1p(n) / math.log1p(maximum)))
            path.set('fill', palette[level])
        title = path.find(NS + 'title')
        title.text = f"{path.get('data-name')}: {n:,} sessions" if c else f"{path.get('data-name')}: no reported visits"
    root.find(f".//{NS}text[@id='map-caption']").text = (
        f"{data['total_sessions']:,} website sessions | {data['start_date']} to {data['end_date']}"
    )
    return ET.tostring(root, encoding='unicode')


def main():
    token = os.environ.get('GA_ACCESS_TOKEN')
    if not token:
        raise RuntimeError('GA_ACCESS_TOKEN is required; no files changed.')
    country_report = report(token, True)
    total_report = report(token, False)
    region_report = report(token, 'regions')
    city_report = report(token, 'cities')
    data = aggregate(country_report, total_report)
    data['regions'] = detailed_rows(region_report)
    data['cities'] = detailed_rows(city_report, cities=True)
    data['thresholded'] = any(r.get('metadata', {}).get('subjectToThresholding', False) for r in [country_report, total_report, region_report, city_report])
    svg = render_svg(data)
    # Render and validate both outputs before writing either. No raw response saved.
    (ROOT / 'assets/data/visitor-map.json').write_text(json.dumps(data, indent=2) + '\n')
    (ROOT / 'images/lab/visitor-map.svg').write_text(svg)
    print('Geographic aggregates and map preview exported successfully.')


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f'Export failed: {e}', file=sys.stderr)
        sys.exit(1)
