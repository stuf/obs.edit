import * as React from 'karet';
import * as U from 'karet.util';

const Timecode = ({ value, type, tickFn, active }) => {
  active.log(U.string`${type} active`);
  const status = U.ifte(active, 'active', 'not active');

  return (
    <article className="Timecode">
      <header>
        {type}
      </header>
      <time>{value}</time>

      <footer>
        {U.toString(active)}
      </footer>
    </article>
  );
}

export default Timecode;
