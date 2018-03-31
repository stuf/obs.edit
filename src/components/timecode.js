import * as React from 'karet';

const Timecode = ({ value, type, style }) =>
  <article className="Timecode" {...{ style }}>
    <time>{value}</time>
    <p className="Timecode__status">{type} <em>Not active</em></p>
  </article>

export default Timecode;
