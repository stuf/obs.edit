import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import * as M from './meta';
import { getStreamingStatus } from './actions';

import {
  registerSocket,
  sendRequest,
} from './socket';

import Timecode from './components/timecode';
import SceneSelect from './components/scene-select';
import Stats from './components/stats';
import Scene from './components/scene';

//

const recordingIn = U.view('recording');
const streamingIn = U.view('streaming');

const AppMain = ({ ws }, { store }) => {
  registerSocket(ws);

  const rec = recordingIn(store);
  const stream = streamingIn(store);
  const stats = M.statsIn(store);
  const currentSceneName = M.currentSceneNameIn(store);
  const sceneList = M.sceneListIn(store);

  const activeScene =
    U.seq(U.mapValue(name => L.filter(R.whereEq({ name })), currentSceneName),
          x => U.view(x, sceneList),
          U.head).log('active');

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

      <section className="Group">
        <article>
          <Timecode value={M.timecodeValueIn(rec)}
                    type="Recording"
                    active={M.activeIn(rec)} />
          <Stats stats={M.recordingIn(stats)}
                 className="horizontal" />
        </article>

        <article>
          <Timecode value={M.timecodeValueIn(stream)}
            type="Streaming"
            active={M.activeIn(stream)} />
          <Stats stats={M.streamingIn(stats)}
                 className="horizontal" />
        </article>
      </section>

      <section className="Group">
        {/* Active scene preview comes here */}
        <Scene scene={activeScene} />
      </section>

      <section className="Group">
        <section className="Section Section__Markers">
          <header>
            <h3 className="h3">Markers</h3>
          </header>

          <div>
            {U.seq(U.range(1, 11),
                   U.map(i => <button key={i}>{i}</button>))}
          </div>
        </section>

        <aside>
          <section className="Section Section_RecFolder">
            <h3 className="h3">Recording folder</h3>

            <div>
              <div className="Group__input">
                <input type="text"
                       className="Input__text"
                       value={U.seq(store, M.OBS.recordingFolderIn)} />
                <button>Save</button>
              </div>

              <details open>
                <summary>Recent folders</summary>

                <ul>
                  {U.seq(M.recordingFoldersIn(store),
                         U.lift(U.show),
                         U.mapElems((el, i) =>
                           <li key={i}>{el.log()}</li>))}
                </ul>
              </details>
            </div>
          </section>
          <section className="Section Section_SceneSelect">
            <SceneSelect current={U.view(['scenes', 'current'], store)}
                        scenes={U.view(['scenes', 'sceneList'], store)} />
          </section>
        </aside>
      </section>
    </div>,
    <div>
      Connecting...
    </div>));
};

export default U.withContext(AppMain);
