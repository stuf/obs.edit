type RecordingStatus =
  'stopped' | 'starting' | 'started';

export interface StreamingState {
  status: RecordingStatus;
  timecode?: number;
}
