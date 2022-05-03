from cloudevents.sdk.event import v1
from dapr.ext.grpc import App
from dapr.clients import DaprClient
from threading import Thread

import json
import test

app = App()


@app.subscribe(pubsub_name='pubsub', topic='newScan')
def newscan(event: v1.Event) -> None:
    data = json.loads(event.Data())
    print(f'Received message: {data}, content_type="{event.content_type}"', flush=True)

    thread = Thread(target=test.entry_point, args=(data,))
    thread.start()


app.run(50051)
