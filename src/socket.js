import K, * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import { fromEvents, stream, Observable } from 'kefir';
import { removeInternalIn } from './meta';

import { curry2, curry3, transformIncomingObj, transformOutgoingObj } from './utils';

const socket = U.bus();
const requests = U.bus();
const responses = U.bus();

const socketP = socket.toProperty();
const requestsP = requests.toProperty();
const responsesP = responses.toProperty();

export const response =
  U.seq(responsesP,
        U.mapValue(v => {
          console.log({ v });
          return v;
        }));

export const responsesCount =
  U.seq(responsesP,
        U.mapValue(U.always(1)),
        U.foldPast(R.add, 0))

//

export const createSocket = (url = 'ws://10.0.1.2:4444') =>
  stream(emitter => {
    const socket = new WebSocket(url);

    socket.onopen = () => emitter.emit(socket);
    socket.onerror = e => emitter.error(e);
    socket.onclose = () => emitter.end();
  });


/**
 * @param {String} type
 * @param {WebSocket} s
 * @returns {Observable}
 */
export const listenTo_ = (type, s) => fromEvents(s, type).map(L.get(['data', L.json()]));

/**
 * @param {String} type
 * @param {WebSocket} s
 * @returns {Observable}
 */
export const listenTo = curry2(listenTo_);

//

let requestCounter = 0;

const getMessageId = () => `obs:internal:message-${requestCounter++}`;

/**
 * @param {String} type
 * @param {WebSocket} s
 * @returns {Observable}
 */
export const send_ = (type, args = {}, s) => {
  const messageId = getMessageId();

  const requestArgs = {
    ...args,
    'request-type': type,
    'message-id': messageId
  };

  const response =
    U.seq(s,
          listenTo('message'),
          U.template,
          U.lift1(transformIncomingObj),
          U.skipUnless(R.whereEq({ messageId })),
          U.takeFirst(1),
          U.lift1(L.set('$$requestType', type)));

  response.onValue(v => responses.push(v));

  s.send(JSON.stringify(requestArgs), err => {
    if (err) throw err;
  });

  return response;
};

/**
 * @param {string} t
 * @param {WebSocket} s
 * @returns {Observable}
 */
export const send = (t, s) => send_(t, {}, s);

/**
 * @param {string} type
 * @param {object} args
 */
export const sendRequest = (type, args) => requests.push([type, args]);

//

const handler =
  K(socketP, requestsP)
    .onValue(([s, [r, as]]) => send(r, s, as))
    .log('handler');

//

export const registerSocket = s => {
  s instanceof Observable
    ? s.onValue(v => socket.push(v))
    : socket.push(s);
};
