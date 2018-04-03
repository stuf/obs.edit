// @flow
import * as React from 'karet';
import type { ComponentType } from 'react';
import { IntlProvider } from 'react-intl';
import * as U from 'karet.util';
import * as R from 'ramda';
import type { Observable } from 'kefir';

import * as H from './utils';
import store from './store';
import { createSocket, send, response, events, handler } from './socket';
import AppMain from './app-main';
import { Request } from './constants';
import type { RequestType, RequestMap, EventMap } from './constants';
import * as RequestHandler from './handlers/request';
import * as EventHandler from './handlers/event';

//

type ValueHandlerArg<T> = {
  obs: Observable<*, *>;
  handlerObj: T;
  getter: Function;
  name?: string;
  logger?: Function;
};

type ValueHandler<T> = (arg: ValueHandlerArg<T>) => void;

type ActionPair = [RequestType & $Keys<{[k: string]: any }>, any];

//

const ws = U.template(createSocket());

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

U.holding(() => {
  ws.onValue(s => {
    initialFetch.forEach(([rt, a]: ActionPair) => {
      // $FlowFixMe
      send(rt, s, a);
    });
  });
});

//

const handleV = <T>({ obs, handlerObj, getter, name }: ValueHandlerArg<T>) =>
  U.seq(obs,
        // $FlowFixMe
        U.mapValue(v => [v, handlerObj[getter(v)]]),
        U.skipUnless(R.last),
        U.flatMapLatest(([x, f]) => U.lift1(f(store))(x)),
        U.on({ value: R.identity }));

const handleResponses =
  handleV({ obs: response,
            handlerObj: RequestHandler,
            getter: R.prop('$$requestType'),
            name: 'response' });

const handleEvents =
  handleV({ obs: events,
            handlerObj: EventHandler,
            getter: R.prop('updateType'),
            name: 'event' });

//

const observableHandlers = U.serially([handler, handleResponses, handleEvents]);

//

const App: ComponentType<*> = () =>
  <div className="App">
    {U.sink(observableHandlers)}

    <IntlProvider locale="en">
      <U.Context context={{ store }}>
        <AppMain ws={ws} />
      </U.Context>
    </IntlProvider>

    <pre><code>{store.map(x => JSON.stringify(x, null, 2))}</code></pre>
  </div>;

//

export default App;
