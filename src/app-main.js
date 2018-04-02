import * as React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

import * as M from './meta';
import { notEmpty } from './utils';
import { getStreamingStatus } from './actions';

import {
  registerSocket,
  response,
  responsesCount,
  sendRequest,
  events
} from './socket';

import Timecode from './components/timecode';
import SceneSelect from './components/scene-select';

//

const recordingIn = U.view('recording');
const streamingIn = U.view('streaming');

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
        <Timecode value={M.timecodeValueIn(rec)}
                  type="Recording"
                  active={M.activeIn(rec)} />
        <Timecode value={M.timecodeValueIn(stream)}
                  type="Streaming"
                  active={M.activeIn(stream)} />
      </section>

      <section className="Group">
        <section className="Section Section__Markers">
          <header>
            <h3>Markers</h3>
          </header>

          <div>
            {U.seq(U.range(1, 11),
                   U.map(i => <button key={i}>{i}</button>))}
          </div>
        </section>

        <section className="Section Section_SceneSelect">
          <SceneSelect current={U.view(['scenes', 'current'], store)}
                       scenes={U.view(['scenes', 'sceneList'], store)} />
        </section>
      </section>
    </div>,
    <div>
      Connecting...
    </div>));
};

export default U.withContext(AppMain);
