import * as U from 'karet.util';
import * as L from 'partial.lenses';

const GetCurrentScene = (store, event) => {
  U.view(['scenes', L.pick({ name: 'current' })], store).set(event);
};

export default GetCurrentScene;
