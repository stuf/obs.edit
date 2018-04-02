import { currentSceneIn } from './meta';

const SwitchScenes = store => event => {
  currentSceneIn(store).set(event.sceneName);
};

export default SwitchScenes;
