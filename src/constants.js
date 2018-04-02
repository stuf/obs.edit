// @flow
const { freeze } = Object;

export const internal = ['messageId', '$$requestType', 'status'];

const events = {
  SwitchScenes: 'SwitchScenes',
  ScenesChanged: 'ScenesChanged',
  SceneCollectionChanged: 'SceneCollectionChanged',
  SceneCollectionListChanged: 'SceneCollectionListChanged',
  SwitchTransition: 'SwitchTransition',
  TransitionListChanged: 'TransitionListChanged',
  TransitionDurationChanged: 'TransitionDurationChanged',
  TransitionBegin: 'TransitionBegin',
  ProfileChanged: 'ProfileChanged',
  ProfileListChanged: 'ProfileListChanged',
  StreamStarting: 'StreamStarting',
  StreamStarted: 'StreamStarted',
  StreamStopping: 'StreamStopping',
  StreamStopped: 'StreamStopped',
  StreamStatus: 'StreamStatus',
  RecordingStarting: 'RecordingStarting',
  RecordingStarted: 'RecordingStarted',
  RecordingStopping: 'RecordingStopping',
  RecordingStopped: 'RecordingStopped',
  ReplayStarting: 'ReplayStarting',
  ReplayStarted: 'ReplayStarted',
  ReplayStopping: 'ReplayStopping',
  ReplayStopped: 'ReplayStopped',
  Exiting: 'Exiting',
  Heartbeat: 'Heartbeat',
  SourceOrderChanged: 'SourceOrderChanged',
  SceneItemAdded: 'SceneItemAdded',
  SceneItemRemoved: 'SceneItemRemoved',
  SceneItemVisibilityChanged: 'SceneItemVisibilityChanged',
  PreviewSceneChanged: 'PreviewSceneChanged',
  StudioModeSwitched: 'StudioModeSwitched',
};

const requests = {
  GetVersion: 'GetVersion',
  StartStopRecording: 'StartStopRecording',
  GetStreamingStatus: 'GetStreamingStatus',
  GetFilenameFormatting: 'GetFilenameFormatting',
  GetRecordingFolder: 'GetRecordingFolder',
  ListProfiles: 'ListProfiles',
  GetSceneList: 'GetSceneList',
  GetCurrentScene: 'GetCurrentScene',
  SetCurrentScene: 'SetCurrentScene',
};

export type EnumType<T> = $Values<T>;

export type RequestType = EnumType<typeof requests>;
export type EventType = EnumType<typeof events>;

export const Request: { [key: RequestType]: RequestType } = freeze({ ...requests });
export const Event: { [key: EventType]: EventType } = freeze({ ...events });
