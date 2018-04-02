// @flow
import { statusFor } from './meta';

interface StreamStatusEvent {
  streaming: boolean;
  recording: boolean;
  previewOnly: boolean;
  bytesPerSec: number;
  kbitsPerSec: number;
  strain: number;
  totalStreamTime: number;
  numTotalFrames: number;
  numDroppedFrames: number;
  fps: number;
}

const StreamStatus = store => (event: StreamStatusEvent) => {
  console.log({ event });
};

export default StreamStatus;
