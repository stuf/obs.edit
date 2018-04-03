import K, * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import { internal } from './constants';

const containedIn = R.flip(R.contains);

const internalKeysL = [L.keys, L.when(containedIn(internal))];

// Local settings

export const recordingFoldersIn = U.view(['settingsLocal', 'recordingFolders', L.define([])]);

// OBS settings

export const OBS = {
  recordingFolderIn: U.view(['settings', 'recordingFolder']),
};

//

export const activeIn = U.view('status');

//

export const recordingIn = U.view('recording');
export const streamingIn = U.view('streaming');

export const timecodeL = L.props('status', 'timecode');
export const timecodeValueIn = U.view(['timecode', L.define('00:00:00.000')])
export const statsIn = U.view('stats');
export const sceneListIn = U.view(['scenes', 'sceneList']);

export const currentSceneNameIn = U.view(['scenes', 'current']);
export const activeSceneIn = (n, o) =>
  U.lift1(name => U.view(['scenes', 'sceneList', L.filter(R.whereEq({ name }))], o), n);
