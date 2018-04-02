import * as U from 'karet.util';
import * as L from 'partial.lenses';

const GetSceneList = store => event => {
  U.view(['scenes',
          L.pick({ currentScene: 'current',
                   scenes: 'sceneList' })], store).set(event);
};

export default GetSceneList;
