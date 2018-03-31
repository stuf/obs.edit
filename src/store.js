/// <reference path="store.d.ts" />
import * as U from 'karet.util';

/**
 * @type {OBS.Store}
 */
const initialState = {
  recording: {
    status: 'stopped',
  },
  streaming: {
    status: 'stopped',
  },
  profiles: [],
  scenes: [],
  sources: [],
  specialSources: [],
  settings: {
    filenameFormatting: '',
    recordingFolder: '',
  },
  obs: {},
};

const store = U.atom(initialState);

store.log('store');

export default store;
