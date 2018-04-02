import { statusFor } from './meta';

const RecordingStopped = store => event => {
  statusFor('recording', store).set('stopped');
};

export default RecordingStopped;
