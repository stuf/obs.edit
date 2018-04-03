// @flow
import * as U from 'karet.util';
import Storage from 'atom.storage';

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

interface StatsState {
  fps?: number;
  strain?: number;
  totalStreamTime?: number;
  numTotalFrames?: number;
  numDroppedFrames?: number;
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
  obs: ObsState;
}

const initialState: State = {
  recording: {
    status: 'stopped',
  },
  streaming: {
    status: 'stopped',
  },
  stats: {},
  profiles: [],
  scenes: {
    current: '',
    sceneList: [],
  },
  sources: [],
  specialSources: [],
  settings: {
    filenameFormatting: '',
    recordingFolder: '',
  },
  obs: {},
};

const storageConfig = {
  key: 'obs.edit:state-v1',
  value: initialState,
  Atom: U.atom,
  storage: localStorage,
};

// const store = Storage(storageConfig);
const store = U.atom(initialState);

store.log('store');

export default store;
