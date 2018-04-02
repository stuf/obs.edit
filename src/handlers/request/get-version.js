import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

const GetVersion = store => event => {
  U.view(['obs',
          L.props('availableRequests', 'obsStudioVersion', 'obsWebsocketVersion'),
          L.pickIn({ availableRequests: L.normalize(R.split(',')),
                     obsStudioVersion: [],
                     obsWebsocketVersion: [] })], store).set(event);
};

export default GetVersion;
