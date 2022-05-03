﻿import sys
import time
from urllib.parse import urlparse

from dapr.clients import DaprClient
import requests


http_observatory_api = 'https://http-observatory.security.mozilla.org/api/v1'


def entry_point(metadata):
    print(f'Starting new scan for: {metadata["url"]}')
    observatory_scan = init_observatory_scan(metadata['url'], metadata['rescan'])
    print(observatory_scan)
    observatory_tests = None
    if observatory_scan.get('state') == 'FINISHED':
        # query test results, and maybe combine this into one object with the scan metadata response
        observatory_tests = get_observatory_results(observatory_scan['scan_id'])
    print(observatory_tests)

    # Combine observatory_scan and observatory_tests into something for our own application
    # {
    #    parentdata: data
    #    observatory: {
    #        data: data
    #    },
    #    something-else: {
    #    }
    # }
    #
    #
    

    # Publish result - DO SOMETHING AT THE END
    # publishresult()


def publishresult():
    with DaprClient() as dapr:
        resp = dapr.publish_event(pubsub_name='pubsub', topic_name='scanResult', data='{"result":"VERY BAD"}')
        print(resp.headers)


def init_observatory_scan(url, rescan):
    clean_hostname = urlparse(url).hostname
    postdata = {'hidden': 'true', 'rescan': 'false' if rescan is None else rescan}
    resp = requests.post(http_observatory_api + f'/analyze?host={clean_hostname}', data=postdata).json()
    if resp.get('error'):
        return resp
    if resp['state'] != 'FINISHED':
        time.sleep(5)
        resp = check_observatory_progress(clean_hostname)
        return resp
    else:
        return resp


def check_observatory_progress(host):
    resp = requests.get(http_observatory_api + f'/analyze?host={host}').json()
    attempts = 1
    while resp['state'] != 'FINISHED':
        time.sleep(5)
        resp = requests.get(http_observatory_api + f'/analyze?host={host}').json()
        attempts += 1
        if attempts >= 60:
            return resp
        if resp['state'] == 'ABORTED' or resp['state'] == 'FAILED':
            return resp
    return resp


# Only for testing purposes
def get_observatory_results(scan_id):
    return requests.get(http_observatory_api + f'/getScanResults?scan={scan_id}').json()


if __name__ == "__main__":
    metadata = {'url': str(sys.argv[1]), 'rescan': sys.argv[2]}
    entry_point(metadata)
