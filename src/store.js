// @flow
import * as U from 'karet.util';
// import Storage from 'atom.storage';
import type { LocalSettings, StatsState } from './types/state';

interface VideoActivityState {
  status: 'stopped' | 'starting' | 'started' | 'stopping';
  timecode?: string;
}

interface Profile {
  [key: string ]: *
}

interface SettingsState {
  filenameFormatting: string;
  recordingFolder: string;
}

interface ObsState {
  availableRequests?: Array<string>;
  obsStudioVersion?: string;
  obsWebsocketVersion?: string;
}

interface ObsSource {
  [key: string]: *;
}

interface ObsSpecialSource {
  [key: string]: *;
}

interface ScenesState {
  current: string;
  sceneList: Array<*>;
}

interface State {
  recording: VideoActivityState;
  streaming: VideoActivityState;
  profiles: Array<Profile>;
  stats: StatsState;
  scenes: ScenesState;
  sources: Array<ObsSource>;
  specialSources: Array<ObsSpecialSource>;
  settings: SettingsState;
  settingsLocal: LocalSettings;
  obs: ObsState;
}

const initialState: State = {
  recording: {
    status: 'stopped',
  },
  streaming: {
    status: 'stopped',
  },
  profiles: [],
  scenes: {
    current: '',
    sceneList: [],
  },
  stats: {
    recording: { time: 0, bytes: 0, frames: 0 },
    streaming: { time: 0, bytes: 0, frames: 0 }
  },
  sources: [],
  specialSources: [],
  settings: {
    filenameFormatting: '',
    recordingFolder: '',
  },
  obs: {},
};

// const storageConfig = {
//   key: 'obs.edit:state-v1',
//   value: initialState,
//   Atom: U.atom,
//   storage: localStorage,
// };

// const store = Storage(storageConfig);
const store = U.atom(initialState);

store.log('store');

export default store;
