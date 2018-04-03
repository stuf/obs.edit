// @flow

export interface OutputMedia {
  time: number;
  bytes: number;
  frames: number;
}

export interface Source {
  cx: number;
  cy: number;
  source_cx: number;
  source_cy: number;
  x: number;
  y: number;
  name: string;
  volume: number;
  render: boolean;
  type: string;
}

export interface Scene {
  name: string;
  sources: Array<Source>;
}
