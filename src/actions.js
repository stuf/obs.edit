import * as U from 'karet.util';

import * as H from './utils';
import * as S from './socket';
import { Request } from './constants';

export const toggleRecording =
  U.lift(() =>
    U.serially([
      S.sendRequest(Request.StartStopRecording),
      S.sendRequest(Request.StartStopRecording)
    ])
  );

export const getStreamingStatus = () => S.sendRequest(Request.GetStreamingStatus);

export const setCurrentScene =
  U.lift1(sceneName =>
    U.serially([
      S.sendRequest(Request.SetCurrentScene, { 'scene-name': sceneName }),
      S.sendRequest(Request.GetCurrentScene)
    ]));
