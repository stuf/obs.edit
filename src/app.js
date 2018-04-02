// @flow
import * as React from 'karet';
import type { ComponentType } from 'react';
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
  ['SetHeartbeat', { enable: false }],
  [Request.GetSceneList, undefined],
  [Request.GetCurrentScene, undefined],
];

// @todo Fixme

U.holding(() => {
  ws.onValue(s => {
    initialFetch.forEach(([rt: $Values<RequestType>, a: any | undefined]) => {
      // $FlowFixMe
      send(rt, s, a);
    });
  });
});

//

const handleValue = (obs, handlerObj, getter, name = 'handler', logger = H.logType(name)) =>
  U.seq(obs,
        U.mapValue(v => [v, handlerObj[getter(v)]]),
        U.skipUnless(R.last),
        U.flatMapLatest(([x, f]) => U.lift1(f(store))(x)),
        U.on({ value: R.identity }))

const handleResponses = handleValue(response, RequestHandler, R.prop('$$requestType'), 'response');
const handleEvents = handleValue(events, EventHandler, R.prop('updateType'), 'event');

//

const observaleHandlers = U.serially([handler, handleResponses, handleEvents]);

//

const App: ComponentType<*> = () =>
  <div className="App">
    {U.sink(observaleHandlers)}

    <U.Context context={{ store }}>
      <AppMain ws={ws} />
    </U.Context>

    <pre><code>{store.map(x => JSON.stringify(x, null, 2))}</code></pre>
  </div>;

//

export default App;
