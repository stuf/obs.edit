import * as U from 'karet.util';
import * as L from 'partial.lenses';

export const timecodeFor = (type, store) => U.view([type, 'timecode'], store);

export const statusL = L.normalize(x => x ? 'started' : 'stopped');
