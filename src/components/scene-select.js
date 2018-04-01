import * as React from 'karet';
import * as U from 'karet.util';

import { setCurrentScene } from '../actions';

const isCurrent = U.lift((a, b) => a.name === b);

const Scene = ({ item, isActive }) => {
  return (
    <li role="menuitem">
      <button onClick={() => setCurrentScene(U.view('name', item)).log()}
              className={U.cns(U.ift(isActive, 'active'))}>
        {U.view('name', item)}
      </button>
    </li>
  );
};

const SceneSelect = ({ scenes, current }) =>
  <section className="SceneSelect">
    <header>
      <h3>Scenes</h3>
    </header>

    <ul className="Menu" role="menu">
      {U.seq(scenes,
             U.mapElems((it, idx) =>
               <Scene key={idx}
                      item={it}
                      isActive={isCurrent(it, current)} />))}
    </ul>
  </section>;

export default SceneSelect;
