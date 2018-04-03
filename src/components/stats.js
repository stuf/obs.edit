// @flow
import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import type { ComponentType } from 'react';
import type { OutputMedia } from '../types/models';

interface Props {
  stats: OutputMedia;
}

const formatters = {
  frames: R.identity,
  bytes: R.identity,
  time: R.identity
};

const Stats: ComponentType<Props> = ({ stats }) =>
  <footer>
    {U.seq(stats,
           U.toPairs,
           U.map(([k, v]) =>
             <div>
               {k}: {(formatters[k] || R.identity)(v)}
             </div>))}
  </footer>;

export default Stats;
