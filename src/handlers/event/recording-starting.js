import { statusFor } from './meta';

const RecordingStarting = (store, event) => {
  statusFor('recording', store).set('starting');
};

export default RecordingStarting;
