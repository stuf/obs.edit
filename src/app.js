import * as React from 'karet';
import K, * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import { stream, constant } from 'kefir';

import * as H from './utils';
import store from './store';
import { createSocket, send } from './socket';
import * as M from './meta';
import AppMain from './app-main';
import { handle } from './handler';

const ws = U.template(createSocket());

//

handle(store);

const initialFetch = [
  ['GetFilenameFormatting'],
  ['GetRecordingFolder'],
  ['ListSceneCollections'],
  ['ListProfiles'],
  ['GetSourcesList'],
  ['GetSpecialSources'],
  ['GetStreamingStatus']
];

ws.onValue(s => {
  console.log('WebSocket opened', s);

  initialFetch.forEach(([rt]) => {
    // console.log({ rt });
    send(rt, s)
      .onValue(v => {
        // console.log(H.transformIncomingObj(v));
      });
  })
});

const App = () =>
  <div className="App">
    <AppMain ws={ws} />

    <pre><code>{store.map(x => JSON.stringify(x, null, 2))}</code></pre>
  </div>;

export default App;
