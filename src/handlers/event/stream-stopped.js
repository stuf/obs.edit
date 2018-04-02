import { streamingStatusIn } from './meta';

const StreamStopped = store => event => {
  streamingStatusIn(store).set('stopped');
};

export default StreamStopped;
