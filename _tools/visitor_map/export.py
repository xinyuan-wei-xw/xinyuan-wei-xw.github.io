"""Export geographic GA4 session aggregates; authentication stays in CI.

Cumulative mode: visit counts accumulate across runs in
assets/data/visitor-map-history.json (committed to the repo by the workflow),
so the map keeps every visit instead of a rolling 30-day window. Each run
queries GA4 only for complete days not yet recorded (through yesterday, in the
property's time zone), merges them into the history, and renders the all-time
aggregates to assets/data/visitor-map.json + images/lab/visitor-map.svg.

The merge is watermarked by last_end: a calendar day is counted exactly once.
If a run finds nothing new, outputs are re-rendered from history unchanged.
The first run seeds as far back as GA4 retention allows (tries 365/180/90/29
days, longest first) and records the achieved seed_range_days.
"""
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

HISTORY_PATH = ROOT / 'assets/data/visitor-map-history.json'
DATA_PATH = ROOT / 'assets/data/visitor-map.json'
SVG_PATH = ROOT / 'images/lab/visitor-map.svg'

DEFAULT_TZ = 'America/New_York'
# Seed attempts, longest first: GA4 only serves data inside its retention
# window, so the first successful range decides how far back history goes.
SEED_DAYS = (365, 180, 90, 29)


def request_body(by_country=True, start_date='29daysAgo', end_date='today'):
    body = {
        'dateRanges': [{'startDate': start_date, 'endDate': end_date}],
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


def report(token, by_country, start_date, end_date):
    req = urllib.request.Request(
        f'https://analyticsdata.googleapis.com/v1beta/properties/{PROPERTY}:runReport',
        data=json.dumps(request_body(by_country, start_date, end_date)).encode(),
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


def fetch_reports(token, start_date, end_date):
    country_report = report(token, True, start_date, end_date)
    total_report = report(token, False, start_date, end_date)
    region_report = report(token, 'regions', start_date, end_date)
    city_report = report(token, 'cities', start_date, end_date)
    return country_report, total_report, region_report, city_report


def parse_reports(country_report, total_report, region_report, city_report):
    """Validate the four GA4 reports and return plain mergeable aggregates."""
    rows = country_report.get('rows', [])
    if country_report.get('rowCount', 0) > len(rows):
        raise ValueError('Incomplete country report; refusing to publish truncated counts')
    countries = []
    for row in rows:
        code, name = [x['value'] for x in row['dimensionValues']]
        n = count(row)
        if n:
            countries.append({'code': code, 'name': name, 'sessions': n})
    total_rows = total_report.get('rows', [])
    total = count(total_rows[0]) if total_rows else 0
    timezone = country_report.get('metadata', {}).get('timeZone', DEFAULT_TZ)
    thresholded = any(r.get('metadata', {}).get('subjectToThresholding', False)
                      for r in [country_report, total_report, region_report, city_report])
    return {
        'countries': countries,
        'total': total,
        'regions': detailed_rows(region_report),
        'cities': detailed_rows(city_report, cities=True),
        'timezone': timezone,
        'thresholded': thresholded,
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


def empty_history(first_start, seed_range_days, timezone):
    return {
        'version': 1,
        'seed_range_days': seed_range_days,
        'first_start': first_start,
        'last_end': None,
        'timezone': timezone,
        'metric': 'sessions',
        'total_sessions': 0,
        'countries': {},
        'regions': {},
        'cities': {},
        'thresholded': False,
    }


def load_history():
    if not HISTORY_PATH.exists():
        return None
    hist = json.loads(HISTORY_PATH.read_text())
    if hist.get('version') != 1:
        raise ValueError(f"Unsupported history version: {hist.get('version')}")
    return hist


def merge_delta(hist, delta):
    """Add one GA4 delta (complete days only) into the cumulative history."""
    hist['total_sessions'] += delta['total']
    for c in delta['countries']:
        entry = hist['countries'].setdefault(c['code'], {'name': c['name'], 'sessions': 0})
        entry['sessions'] += c['sessions']
    for r in delta['regions']:
        key = r['country'] + '|' + r['region']
        entry = hist['regions'].setdefault(key, {
            'country': r['country'], 'country_name': r['country_name'],
            'region': r['region'], 'sessions': 0,
        })
        entry['sessions'] += r['sessions']
    for c in delta['cities']:
        key = '|'.join([c['country'], c['region'], c['city']])
        entry = hist['cities'].setdefault(key, {
            'country': c['country'], 'country_name': c['country_name'],
            'region': c['region'], 'city': c['city'], 'sessions': 0,
        })
        # Gazetteer coordinates are static; keep the first-seen location.
        if 'location' in c and 'location' not in entry:
            entry['location'] = c['location']
        entry['sessions'] += c['sessions']
    hist['thresholded'] = hist['thresholded'] or delta['thresholded']


def render_data(hist):
    """Render the all-time aggregates in the visitor-map.json schema."""
    countries = sorted(
        ({'code': code, 'name': e['name'], 'sessions': e['sessions']}
         for code, e in hist['countries'].items()),
        key=lambda x: (-x['sessions'], x['name']),
    )
    regions = sorted(
        ({'country': e['country'], 'country_name': e['country_name'],
          'region': e['region'], 'sessions': e['sessions']}
         for e in hist['regions'].values()),
        key=lambda x: (-x['sessions'], x['region']),
    )
    cities = sorted(
        ({'country': e['country'], 'country_name': e['country_name'],
          'region': e['region'], 'city': e['city'], 'sessions': e['sessions'],
          **({'location': e['location']} if 'location' in e else {})}
         for e in hist['cities'].values()),
        key=lambda x: (-x['sessions'], x['city']),
    )
    return {
        'status': 'ready',
        'updated_at': dt.datetime.now(dt.timezone.utc).isoformat(timespec='seconds'),
        'start_date': hist['first_start'],
        'end_date': hist['last_end'],
        'timezone': hist['timezone'],
        'metric': 'sessions',
        'total_sessions': hist['total_sessions'],
        'countries': countries,
        'regions': regions,
        'cities': cities,
        'thresholded': hist['thresholded'],
    }


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

    hist = load_history()
    tz = ZoneInfo(hist['timezone'] if hist else DEFAULT_TZ)
    today = dt.datetime.now(tz).date()
    yesterday = today - dt.timedelta(days=1)

    if hist is None:
        # First run: seed as far back as GA4 retention allows, longest first.
        seeded = False
        for days in SEED_DAYS:
            start = (today - dt.timedelta(days=days)).isoformat()
            try:
                reports = fetch_reports(token, start, yesterday.isoformat())
            except RuntimeError:
                continue  # range outside retention; try a shorter one
            delta = parse_reports(*reports)
            hist = empty_history(start, days, delta['timezone'])
            merge_delta(hist, delta)
            hist['last_end'] = yesterday.isoformat()
            seeded = True
            print(f'Seeded cumulative history from GA4: last {days} days.')
            break
        if not seeded:
            raise RuntimeError('GA4 seed failed for every range; no files changed.')
    else:
        start = (dt.date.fromisoformat(hist['last_end']) + dt.timedelta(days=1)).isoformat() \
            if hist['last_end'] else hist['first_start']
        if start <= yesterday.isoformat():
            reports = fetch_reports(token, start, yesterday.isoformat())
            delta = parse_reports(*reports)
            merge_delta(hist, delta)
            hist['last_end'] = yesterday.isoformat()
            print(f'Merged GA4 days {start} to {yesterday.isoformat()} into cumulative history.')
        else:
            print('History already covers all complete days; re-rendering from history.')

    data = render_data(hist)
    svg = render_svg(data)
    # Render and validate everything before writing anything. No raw response saved.
    history_text = json.dumps(hist, indent=2, sort_keys=True) + '\n'
    data_text = json.dumps(data, indent=2) + '\n'
    assert json.loads(data_text)['status'] == 'ready'
    assert json.loads(history_text)['last_end'] == yesterday.isoformat()
    HISTORY_PATH.write_text(history_text)
    DATA_PATH.write_text(data_text)
    SVG_PATH.write_text(svg)
    print('Cumulative visit history and map outputs exported successfully.')


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f'Export failed: {e}', file=sys.stderr)
        sys.exit(1)
