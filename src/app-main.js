import * as React from 'karet';
import K, * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import { fromEvents, pool } from 'kefir';

import { notEmpty } from './utils';
import { listenTo, send, registerSocket, response, responsesCount, handler, sendRequest } from './socket';
import { getStreamingStatus } from './actions';

import Timecode from './components/timecode';

const fromEventType = R.curryN(2, (type, emitter) => fromEvents(emitter, type));

//

const AppMain = ({ ws }) => {
  registerSocket(ws);

  return U.fromKefir(U.ift(ws,
    <div className="AppMain">
      <section className="Section RecordingControls">
        <button onClick={() => sendRequest('StartStopRecording')}>
          Toggle Recording
        </button>

        <button onClick={getStreamingStatus}>
          Get status
        </button>

        <button onClick={() => sendRequest('GetVersion')}>
          Get Version
        </button>

        <button onClick={() => sendRequest('GetFilenameFormatting')}>
          Get Filename Format
        </button>

        <button onClick={() => sendRequest('GetRecordingFolder')}>
          Get Recording Folder
        </button>
      </section>

      <section className="Section">
        <div className="Group">
          <Timecode value={'00:00:00.000'}
                    type="Recording" />
          <Timecode value={'00:00:00.000'}
                    type="Streaming" />
        </div>
      </section>

      <section className="Section">
        <h3>Markers</h3>
        <button>
          Marker 1
        </button>
        <button>
          Marker 2
        </button>
        <button>
          Marker 3
        </button>
      </section>

      <section className="Section">
        <dl>
          <dt>Websocket</dt>
          <dd>{U.ifte(notEmpty(ws), 'open', 'not open')}</dd>

          <dt>Messages received</dt>
          <dd>{responsesCount}</dd>

          <dt>Last message</dt>
          <dd><pre><code>{response.map(x => JSON.stringify(x, null, 2))}</code></pre></dd>
        </dl>
      </section>
    </div>));
};

export default AppMain;
