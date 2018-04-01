import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import { camelCasePascal, pascalCaseCamel } from './utils';
import { Request, internal } from './constants';

const containedIn = R.flip(R.contains);

const internalKeysL = [L.keys, L.when(containedIn(internal))];

export const removeInternalIn = L.transform([internalKeysL, L.removeOp]);

export const obsKeyI =
  L.iso(L.modify(L.keys, camelCasePascal),
        L.modify(L.keys, pascalCaseCamel));

export const ResponseTfn = {
  [Request.GetVersion]: L.transform(['availableRequests',
                                     L.modifyOp(R.split(','))])
};

//

export const settingsIn = U.view('settings');
export const recFolderIn = U.view('recordingFolder');
export const filenameFormatIn = U.view('filenameFormatting');

export const isActiveIn = k => [k, L.normalize(R.equals('started'))];

export const currentSceneIn = U.view(['scenes', 'current']);
export const sceneListIn = U.view(['scenes', 'sceneList', L.define([])]);

export const profilesIn = U.view('profiles');

//

export const timecodeL = L.props('status', 'timecode');
export const timecodeIn = U.view(timecodeL);

export const View = {
  [Request.GetStreamingStatus]:
    U.view(L.pickIn({ recording: timecodeL, streaming: timecodeL })),
  [Request.GetFilenameFormatting]:
    U.view(['settings', 'filenameFormatting']),
};

//

export const obsVersionIn =
  U.view(['obs', L.props('availableRequests', 'obsStudioVersion', 'obsWebsocketVersion')])
