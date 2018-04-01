import * as React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

import { notEmpty } from './utils';
import { registerSocket, response, responsesCount, sendRequest } from './socket';
import { getStreamingStatus } from './actions';

import Timecode from './components/timecode';
import SceneSelect from './components/scene-select';

//

const activeIn = U.view(['status', L.reread(x => x === 'started'), L.define(false)]);
const timecodeIn = U.view(['timecode', L.define('00:00:00.000')]);

const recordingIn = U.view('recording');
const streamingIn = U.view('streamig');

const AppMain = ({ ws }, { store }) => {
  registerSocket(ws);

  const rec = recordingIn(store);
  const stream = streamingIn(store);

  return U.fromKefir(U.ifte(ws,
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

      <section className="Section Section__Timecode">
        <Timecode value={timecodeIn(rec)}
                  type="Recording"
                  active={activeIn(rec)} />
        <Timecode value={timecodeIn(stream)}
                  type="Streaming"
                  active={activeIn(stream)} />
      </section>

      <section className="Group">
        <section className="Section Section__Markers">
          <header>
            <h3>Markers</h3>
          </header>

          <div>
            {U.seq(U.range(1, 20),
                   U.map(i =>
                     <button key={i}>{i}</button>))}
          </div>
        </section>

        <section className="Section Section_SceneSelect">
          <SceneSelect current={U.view(['scenes', 'current'], store)}
                       scenes={U.view(['scenes', 'sceneList'], store)} />
        </section>
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
    </div>,
    <div>
      Connecting...
    </div>));
};

export default U.withContext(AppMain);
