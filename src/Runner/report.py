import json
import datetime
from dapr.clients import DaprClient


def new_report(scan_metadata, observatory_scan, observatory_tests):
    report = {}
    report['scan'] = scan_metadata['id']
    report['start_date'] = scan_metadata['date']
    report['end_date'] = datetime.datetime.now().isoformat()
    report['url'] = scan_metadata['url']
    report['hidden'] = scan_metadata['hidden']
    report['rescan'] = scan_metadata['rescan']
    if observatory_scan.get('error'):
        report['observatory'] = {}
        report['observatory']['error'] = observatory_scan['error']
    else:
        report['observatory'] = {}
        report['observatory']['metadata'] = observatory_scan
    if observatory_tests:
        report['observatory']['tests'] = observatory_tests
        report = determine_grade(report)

    # TO DO: add grading
    publish_report(report)


def determine_grade(report):
    # Change the grade chart score when adding new tests
    GRADE_CHART = {
        100: 'A+',
        95: 'A',
        90: 'A',
        85: 'A-',
        80: 'B+',
        75: 'B',
        70: 'B',
        65: 'B-',
        60: 'C+',
        55: 'C',
        50: 'C',
        45: 'C-',
        40: 'D+',
        35: 'D',
        30: 'D',
        25: 'D-',
        20: 'F',
        15: 'F',
        10: 'F',
        5: 'F',
        0: 'F'
    }

    # Combine multiple scores when future tests are added
    observatory_score = report['observatory']['metadata']['score']
    grade = GRADE_CHART[min(observatory_score - observatory_score % 5, 100)]
    report['grade'] = grade
    return report


def publish_report(report):
    with DaprClient() as dapr:
        resp = dapr.publish_event(pubsub_name='pubsub', topic_name='resultReport', data=json.dumps(report),
                                  data_content_type='application/json')
        print(f'Published new report for: {report["url"]}')
