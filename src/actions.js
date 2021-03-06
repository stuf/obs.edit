import * as U from 'karet.util';

import * as S from './socket';
import { Request } from './constants';

export const toggleRecording =
  U.lift(() =>
    U.serially([
      S.sendRequest(Request.StartStopRecording),
      S.sendRequest(Request.StartStopRecording)
    ])
  );

export const getStreamingStatus = () =>
  S.sendRequest(Request.GetStreamingStatus);

export const setCurrentScene = name =>
  S.sendRequest(Request.SetCurrentScene, { 'scene-name': name });
