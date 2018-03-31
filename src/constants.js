const { freeze } = Object;

export const internal = ['messageId', '$$requestType', 'status'];

export const Request = freeze({
  GetVersion: 'GetVersion',
  StartStopRecording: 'StartStopRecording',
  GetStreamingStatus: 'GetStreamingStatus',
  GetFilenameFormatting: 'GetFilenameFormatting',
  GetRecordingFolder: 'GetRecordingFolder',
  ListProfiles: 'ListProfiles',
});
