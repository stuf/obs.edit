import * as U from 'karet.util';

import * as H from './utils';
import * as S from './socket';
import { Request } from './constants';

export const toggleRecording = () => S.sendRequest(Request.StartStopRecording);
export const getStreamingStatus = () => S.sendRequest(Request.GetStreamingStatus);
