// @flow
export interface Message {
  messageId: string;
  status: 'ok' | 'error';
}

export interface Response {
  $$requestType?: string;
}

export interface Event {
  $$updateType?: string;
}

export interface StrMap<T> {
  [key: string]: T;
}

export type ObsEvent = Message & Event & StrMap<*>;
