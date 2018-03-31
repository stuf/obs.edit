import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import * as H from './utils';
import * as S from './socket';
import { Request } from './constants';
import { removeInternalIn, ResponseTfn } from './meta';

const settingsIn = U.view('settings');
const recFolderIn = U.view('recordingFolder');
const filenameFormatIn = U.view('filenameFormatting');

const profilesIn = U.view('profiles');

const obsVersionIn = U.view(['obs', L.props('availableRequests', 'obsStudioVersion', 'obsWebsocketVersion')])

export const handle = store => {
  const settings = settingsIn(store);

  S.response.observe(evt => {
    const cleaned = removeInternalIn(evt);
    const transformer = L.get(evt.$$requestType, ResponseTfn);
    const fromEv = xs => L.get(xs, transformer ? transformer(cleaned) : cleaned);

    console.log('Event:', evt);

    switch (evt.$$requestType) {
      case Request.ListProfiles:
        profilesIn(store).set(fromEv('profiles'));
        break;

      case Request.GetRecordingFolder:
        recFolderIn(settings).set(fromEv('recFolder'));
        break;

      case Request.GetVersion:
        obsVersionIn(store).set(transformer(evt));
        break;

      case Request.GetFilenameFormatting:
        filenameFormatIn(settings).set(fromEv('filenameFormatting'));
        break;

      default:
        console.log(`No handler found for event of type \'${evt.$$requestType}\'`);
    }
  });
};
