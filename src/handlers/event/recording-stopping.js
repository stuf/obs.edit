import { statusFor } from './meta';

const RecordingStopping = (store, event) => {
  statusFor('recording', store).set('stopping');
};

export default RecordingStopping;
