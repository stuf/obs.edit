// @flow
export type Status = 'stopped' | 'starting' | 'started' | 'stopping';

export interface Timecode<T = string> {
  status: Status;
  timecode: string;
  type: T;
}
