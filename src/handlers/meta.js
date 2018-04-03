import * as U from 'karet.util';
import * as L from 'partial.lenses';

export const streamingStatusIn = U.view(['streaming', 'status']);
export const recordingStatusIn = U.view(['recording', 'status']);

export const statusL = L.normalize(x => x ? 'started' : 'stopped');
