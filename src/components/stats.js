// @flow
import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import { FormattedNumber } from './i18n';
import type { ComponentType } from 'react';
import type { OutputMedia } from '../types/models';

interface Props {
  stats: OutputMedia;
  className?: string;
}

const humanizeTimeSpan = v => {
  const hours = v / 3600;
  const minutes = (v / 60) % 60;
  const seconds = v % 60;

  const str =
    [hours, minutes, seconds]
      .map(R.pipe(Math.floor, R.toString, R.when(x => x.length === 1, R.concat('0'))))
      .join(':');

  return str;
};

const formatters = {
  frames: v => <FormattedNumber value={v} />,
  bytes: v => <FormattedNumber value={v} />,
  time: humanizeTimeSpan
};

const Stats: ComponentType<Props> = ({ stats, className }) =>
  <div className="Stats">
    <dl className={U.cns(className)}>
    {U.seq(stats,
           U.toPairs,
           U.map(([k, v]) =>
             [<dt key={U.string`${k}-key`}>{k}</dt>,
              <dd key={U.string`${k}-value`}>{(formatters[k] || R.identity)(v)}</dd>]))}
    </dl>
  </div>;

export default Stats;
