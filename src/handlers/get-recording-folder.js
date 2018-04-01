import * as U from 'karet.util';
import * as L from 'partial.lenses';

const GetRecordingFolder = (store, event) => {
  U.view(['settings',
          L.pick({ recFolder: 'recordingFolder' })], store).set(event);
};

export default GetRecordingFolder;
