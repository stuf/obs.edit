import * as React from 'karet';
import * as U from 'karet.util';

const Timecode = ({ value, type, tickFn, active }) =>
  <article className="Timecode">
    <header>
      {type}
    </header>
    <time>{value}</time>

    <footer>
      {U.ifte(active, 'active', 'not active')}
    </footer>
  </article>;

export default Timecode;
