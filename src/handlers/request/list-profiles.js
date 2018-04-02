import * as U from 'karet.util';
import * as L from 'partial.lenses';

const GetProfiles = store => event => {
  U.view(L.pickIn({ profiles: [] }), store).set(event);
}

export default GetProfiles;
