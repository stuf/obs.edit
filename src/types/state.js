// @flow
import type { OutputMedia } from './models';

export interface LocalSettings {
  recordingFolders: Array<string>;
}

export interface StatsState {
  fps?: number;
  strain?: number;
  totalStreamTime?: number;
  numTotalFrames?: number;
  numDroppedFrames?: number;
  streaming: OutputMedia;
  recording: OutputMedia;
}
