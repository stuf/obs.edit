import * as U from 'karet.util';

export const statusFor = (type, atom) => U.view([type, 'status'], atom);

export const currentSceneIn = U.view(['scenes', 'current']);
