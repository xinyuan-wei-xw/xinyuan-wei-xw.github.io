import importlib.util
from pathlib import Path
import unittest
import xml.etree.ElementTree as ET

spec = importlib.util.spec_from_file_location('map_export', Path(__file__).with_name('export.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class ExportChecks(unittest.TestCase):
    def test_public_output_contains_only_aggregates(self):
        report = {'rowCount': 1, 'rows': [{'dimensionValues': [{'value': 'US'}, {'value': 'United States'}], 'metricValues': [{'value': '12'}]}], 'privateExtra': 'must not escape'}
        total = {'rows': [{'metricValues': [{'value': '10'}]}]}
        data = module.aggregate(report, total)
        self.assertEqual(data['total_sessions'], 10)  # Never sum country session counts.
        self.assertEqual(set(data['countries'][0]), {'code', 'name', 'sessions'})
        self.assertNotIn('privateExtra', data)
        svg = module.render_svg(data)
        root = ET.fromstring(svg)
        us = [p for p in root.iter(module.NS+'path') if p.get('data-country') == 'US']
        self.assertTrue(us)
        self.assertTrue(all(p.get('fill') for p in us))
        self.assertIn('12 sessions', us[0].find(module.NS+'title').text)
    def test_incomplete_results_are_rejected(self):
        with self.assertRaises(ValueError):
            module.aggregate({'rowCount': 2, 'rows': []}, {})
    def test_no_data_is_zero_not_fake_visitors(self):
        data = module.aggregate({}, {})
        self.assertEqual(data['countries'], [])
        self.assertEqual(data['total_sessions'], 0)
    def test_single_city_visit_is_included_without_raw_fields(self):
        def row(city, visits):
            return {'dimensionValues': [{'value': value} for value in
                    ['US', 'United States', 'Georgia', city]],
                    'metricValues': [{'value': str(visits)}],
                    'privateExtra': 'must not escape'}
        result = module.detailed_rows({'rows': [row('Unknown test city', 1),
                                                row('Zero visits', 0)]}, cities=True)
        self.assertEqual(result, [{'country': 'US', 'country_name': 'United States',
                                  'region': 'Georgia', 'city': 'Unknown test city',
                                  'sessions': 1}])
    def test_scope_excludes_map_only_visits(self):
        body = module.request_body()
        self.assertEqual(body['metrics'], [{'name':'sessions'}])
        filters=body['dimensionFilter']['andGroup']['expressions']
        self.assertEqual(filters[0]['filter']['stringFilter']['value'], module.HOST)
        self.assertEqual(filters[1]['filter']['stringFilter']['value'], 'page_view')
        self.assertEqual(filters[2]['notExpression']['filter']['stringFilter'], {'matchType':'BEGINS_WITH','value':'/visitor-map'})

if __name__ == '__main__':
    unittest.main()
