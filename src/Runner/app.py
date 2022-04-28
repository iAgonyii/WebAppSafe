from cloudevents.sdk.event import v1
from dapr.ext.grpc import App
from dapr.clients import DaprClient

import json
import _thread

import test

app = App()


@app.subscribe(pubsub_name='pubsub', topic='newScan')
def newscan(event: v1.Event) -> None:
    data = json.loads(event.Data())
    print(f'Received message: {data}, content_type="{event.content_type}"', flush=True)
    # Received the new scan request
    # Do something ... (LOOK AT THREADING MODULE INSTEAD)
    try:
        _thread.start_new_thread(test.hello, ())
    except:
        print ("Error: unable to start scanning thread")
    # Publish result - this might have to be in end of thread function
    publishresult()


def publishresult():
    with DaprClient() as dapr:
        resp = dapr.publish_event(pubsub_name='pubsub', topic_name='scanResult', data='{"result":"VERY BAD"}')
        print(resp.headers)


app.run(50051)
