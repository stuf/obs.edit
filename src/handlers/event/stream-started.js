import { streamingStatusIn } from './meta';

const StreamStarted = store => event => {
  streamingStatusIn(store).set('started');
};

export default StreamStarted;
