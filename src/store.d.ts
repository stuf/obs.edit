import { RecordingState } from './models/recording';
import { StreamingState } from './models/streaming';

export declare namespace OBS {
  export interface Store {
    recording: RecordingState;
    streaming: StreamingState;
  }
}
