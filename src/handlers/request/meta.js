import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

export const timecodeFor = (type, store) => U.view([type, 'timecode'], store);
