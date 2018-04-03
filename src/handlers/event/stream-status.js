// @flow
import * as U from 'karet.util';
import * as L from 'partial.lenses';

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

const StreamStatus = (store: *) => (event: StreamStatusEvent) => {
  console.log('StreamStatus', { event });
  const view =
    L.props('strain',
            'totalStreamTime',
            'numTotalFrames',
            'numDroppedFrames',
            'fps');

  U.view(['stats', view], store).set(event);
};

export default StreamStatus;
