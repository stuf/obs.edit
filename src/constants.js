// @flow
const { freeze } = Object;

export const internal = ['messageId', '$$requestType', 'status'];

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

type RequestType = $Keys<typeof requests>;

export const Request: { [key: RequestType]: RequestType } = freeze({ ...requests });

