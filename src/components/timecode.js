import * as React from 'karet';
import * as U from 'karet.util';

const Timecode = ({ value, type, tickFn, active, isActive = U.equals(active) }) =>
  <article className="Timecode">
    <header>
      <div>{type}</div>
    </header>

    <time>
      {value}
    </time>

    <footer>
      <ul className="Timecode__status">
        {U.seq(['stopped', 'stopping', 'starting', 'started'],
               U.map(s =>
                 <li className={U.cns(U.ift(isActive(s), 'active'))}
                     key={s}>
                   {s}
                 </li>))}
      </ul>
    </footer>
  </article>;

export default Timecode;
