import * as R from 'ramda';
import * as L from 'partial.lenses';
import { camelCasePascal, pascalCaseCamel } from './utils';
import { Request, internal } from './constants';

const containedIn = R.flip(R.contains);

const internalKeysL = [L.keys, L.when(containedIn(internal))];

export const removeInternalIn = L.transform([internalKeysL, L.removeOp]);

export const obsKeyI =
  L.iso(L.modify(L.keys, camelCasePascal),
        L.modify(L.keys, pascalCaseCamel));

export const ResponseTfn = {
  [Request.GetVersion]: L.transform(['availableRequests',
                                     L.modifyOp(R.split(','))])
};
