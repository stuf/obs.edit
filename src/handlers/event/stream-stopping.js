import { streamingStatusIn } from './meta';

const StreamStopping = store => event => {
  streamingStatusIn(store).set('stopping');
};

export default StreamStopping;
