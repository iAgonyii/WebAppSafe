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

    # TO DO: add grading
    publish_report(report)


def publish_report(report):
    with DaprClient() as dapr:
        resp = dapr.publish_event(pubsub_name='pubsub', topic_name='resultReport', data=json.dumps(report),
                                  data_content_type='application/json')
        print(f'Published new report for: {report["url"]}')
