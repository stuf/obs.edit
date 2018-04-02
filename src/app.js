// @flow
import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';

import * as H from './utils';
import store from './store';
import { createSocket, send, response, events, handler } from './socket';
import AppMain from './app-main';
import { Request } from './constants';
import type { RequestType } from './constants';
import * as RequestHandler from './handlers/request';
import * as EventHandler from './handlers/event';

const ws = U.template(createSocket());

//

const initialFetch = [
  ['GetFilenameFormatting', undefined],
  ['GetRecordingFolder', undefined],
  ['ListSceneCollections', undefined],
  ['ListProfiles', undefined],
  ['GetSourcesList', undefined],
  ['GetSpecialSources', undefined],
  ['GetStreamingStatus', undefined],
  ['SetHeartbeat', { enable: true }],
  [Request.GetSceneList, undefined],
  [Request.GetCurrentScene, undefined],
];

// @todo Fixme

ws.onValue(s => {
  initialFetch.forEach(([rt: $Values<RequestType>, a: any | undefined]) => {
    send(rt, s, a);
  });
});

//

const log = H.logType('handler');

const handleValue = (obs, handlerObj, getter) =>
  U.seq(obs,
        U.mapValue(v => [v, handlerObj[getter(v)]]),
        U.lift(log),
        U.skipUnless(R.last),
        U.on({ value: ([x, f]) => f(store, x) })).log('handler');

const handleResponses = handleValue(response, RequestHandler, R.prop('$$requestType'));
const handleEvents = handleValue(events, EventHandler, R.prop('updateType'));

//

const observaleHandlers = U.serially([handler, handleResponses, handleEvents]);

//

const App = () =>
  <div className="App">
    {U.sink(observaleHandlers)}

    <U.Context context={{ store }}>
      <AppMain ws={ws} />
    </U.Context>

    <pre><code>{store.map(x => JSON.stringify(x, null, 2))}</code></pre>
  </div>;

//

export default App;
