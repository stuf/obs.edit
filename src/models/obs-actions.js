// @flow
import * as t from 'tcomb';

export const Action =
  t.struct({ timestamp: t.Date,
             payload: t.Any },
           { strict: true, name: 'Action' });
