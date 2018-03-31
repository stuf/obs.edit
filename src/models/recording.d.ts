export type RecordingStatus =
  'stopped' | 'starting' | 'started' | 'stopping';

export interface RecordingState {
  state: RecordingStatus;
  timecode?: number;
}
