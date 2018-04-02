// @flow
import K, * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import { fromEvents, stream, Observable } from 'kefir';

import { curry2, transformIncomingObj as tfnInc } from './utils';

interface ObsEvent {
  messageId: string;
  status: 'ok' | 'error';
  $$requestType?: string;
}

type Event = ObsEvent & { [key: string]: any };

type ArgumentObj = { [key: string]: string };

const socket = U.bus();
const requests = U.bus();
const responses = U.bus();

const socketP = socket.toProperty();
const requestsP = requests.toProperty();
const responsesP = responses.toProperty();

export const response =
  U.identity(responsesP);

export const responsesCount =
  U.seq(responsesP,
        U.mapValue(U.always(1)),
        U.foldPast(R.add, 0))

//

export const createSocket = (url: string = 'ws://10.0.1.2:4444'): Observable<WebSocket, *> =>
  stream(emitter => {
    const socket = new WebSocket(url);

    socket.onopen = () => emitter.emit(socket);
    socket.onerror = e => emitter.error(e);
    socket.onclose = () => emitter.end();
  });


/**
 * @param type
 * @param s
 * @returns Oservable stream for the given event type
 */
export const listenTo_ = (type: string, s: WebSocket): Observable<*, *> =>
  fromEvents(s, type).map(L.get(['data', L.json()]));

/**
 * @param {String} type
 * @param {WebSocket} s
 * @returns {Observable}
 */
export const listenTo = curry2(listenTo_);

//

let requestCounter: number = 0;

const getMessageId = (): string => `obs:internal:message-${requestCounter++}`;

export const send_ = (type: string, args?: ArgumentObj, s: WebSocket) => {
  const messageId = getMessageId();

  const requestArgs: ArgumentObj = {
    ...args,
    'request-type': type,
    'message-id': messageId
  };

  const response =
    U.seq(s,
          listenTo('message'),
          U.template,
          U.lift1(tfnInc),
          U.skipUnless(R.whereEq({ messageId })),
          U.takeFirst(1),
          U.lift1(L.set('$$requestType', type)));

  response.onValue(v => responses.push(v));

  s.send(JSON.stringify(requestArgs));

  return response;
};

export const send = (type: string, s: WebSocket, args?: ArgumentObj) => send_(type, args, s);

export const sendRequest = (type: string, args: {}): void => requests.push([type, args]);

//

export const events: Observable<Event, *> =
  U.seq(socket,
        U.flatMapLatest(listenTo('message')),
        U.lift(tfnInc),
        U.skipUnless(R.has('updateType')));

//

export const handler =
  U.seq(K(socketP, requestsP),
        U.on({ value: ([s, [r, as]]) => send(r, s, as) }));
//

export const registerSocket = (s: Observable<WebSocket> | WebSocket) => {
  s instanceof Observable
    ? s.onValue(v => socket.push(v))
    : socket.push(s);
};
