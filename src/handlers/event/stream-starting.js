import { streamingStatusIn } from './meta';

const StreamStarting = store => event => {
  streamingStatusIn(store).set('starting');
};

export default StreamStarting;
