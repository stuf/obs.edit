import { timecodeFor } from './meta';

const GetStreamingStatus = store => event => {
  timecodeFor('recording', store).set(event.recTimecode);
};

export default GetStreamingStatus;
