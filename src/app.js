// @flow
import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';

import * as H from './utils';
import store from './store';
import { createSocket, send, response, handler } from './socket';
import AppMain from './app-main';
import { Request } from './constants';
import * as Handler from './handlers';

const ws = U.template(createSocket());

//

const initialFetch = [
  ['GetFilenameFormatting'],
  ['GetRecordingFolder'],
  ['ListSceneCollections'],
  ['ListProfiles'],
  ['GetSourcesList'],
  ['GetSpecialSources'],
  ['GetStreamingStatus'],
  [Request.GetSceneList],
  [Request.GetCurrentScene],
];

// @todo Fixme

ws.onValue(s => {
  initialFetch.forEach(([rt]) => {
    send(rt, s)
  });
});

//

const handleResponses =
  U.seq(response,
        U.mapValue(res => [res, Handler[res.$$requestType]]),
        U.lift(H.logRequestType),
        U.skipUnless(R.last),
        U.on({ value: ([x, f]) => f(store, x) }));

const initialData = [handler, handleResponses];

//

const App = () =>
  <div className="App">
    {U.sink(U.serially(initialData))}

    <U.Context context={{ store }}>
      <AppMain ws={ws} />
    </U.Context>

    <pre><code>{store.map(x => JSON.stringify(x, null, 2))}</code></pre>
  </div>;

//

export default App;
