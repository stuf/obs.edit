import * as U from 'karet.util';

export const statusFor = (type, atom) => U.view([type, 'status'], atom);

export const streamingStatusIn = U.view(['streaming', 'status']);
export const recordingStatusIn = U.view(['recording', 'status']);

export const currentSceneIn = U.view(['scenes', 'current']);
