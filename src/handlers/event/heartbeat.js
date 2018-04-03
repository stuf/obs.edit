// @flow
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import { statusL } from '../meta';

interface Event {
  pulse: boolean;
  currentProfile?: string;
  currentScene?: string;
  streaming?: boolean;
  totalStreamTime?: number;
  totalStreamBytes?: number;
  totalStreamFrames?: number;
  recording?: boolean;
  totalRecordTime?: number;
  totalRecordBytes?: number;
  totalRecordFrames?: number;
}

const Heartbeat = (store: *) => (event: Event) => {
  const streamStats = ['stats', 'streaming'];
  const recordStats = ['stats', 'recording'];
  const req0 = L.required(0);

  U.view(L.pick({
    streaming: ['streaming', 'status', statusL],
    recording: ['recording', 'status', statusL],
    totalStreamTime: [streamStats, 'time', req0],
    totalStreamBytes: [streamStats, 'bytes', req0],
    totalStreamFrames: [streamStats, 'frames', req0],
    totalRecordTime: [recordStats, 'time', req0],
    totalRecordBytes: [recordStats, 'bytes', req0],
    totalRecordFrames: [recordStats, 'frames', req0],
  }), store).set(event);
};

export default Heartbeat;
