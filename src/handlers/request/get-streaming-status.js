// @flow
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import { statusL } from './meta';
import { ObsEvent } from '../../types/obs';

interface Event {
  previewOnly: boolean;
  recording: boolean;
  recTimecode: string;
  streaming: boolean;
  streamTimecode: string;
}

const GetStreamingStatus = store => (event: ObsEvent & Event) => {
  const l = L.pick({
    recording: L.pick({ status: ['recording', statusL], timecode: 'recTimecode' }),
    streaming: L.pick({ status: ['streaming', statusL], timecode: 'streamTimecode' })
  });

  U.view(L.props('recording', 'streaming'), store).set(L.get(l, event));
};

export default GetStreamingStatus;
