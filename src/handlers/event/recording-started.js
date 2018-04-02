import { statusFor } from './meta';

const RecordingStarted = store => event => {
  statusFor('recording', store).set('started');
};

export default RecordingStarted;
