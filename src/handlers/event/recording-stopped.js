import * as U from 'karet.util';

const RecordingStopped = (store, event) => {
  U.view(['recording', 'status'], store).set('stopped');
}

export default RecordingStopped;
