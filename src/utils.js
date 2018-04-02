import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

export const notEmpty = U.complement(U.isEmpty);

export const curry2 = R.curryN(2);
export const curry3 = R.curryN(3);

export const flatJoin = R.pipe(R.flatten, R.join(''));

export const splitPascal = R.match(/([A-Z][a-z]+)/g);
export const splitCamelCase = R.match(/(^[a-z]+|[A-Z][a-z]+)/g);

export const camelCasePascal = R.compose(R.join(''), L.modify(0, R.toLower), splitPascal);
export const kebabCasePascal = R.compose(R.toLower, R.join('-'), splitPascal);
export const constCasePascal = R.compose(R.toUpper, R.join('_'), splitPascal);

export const pascalCaseCamel = R.compose(flatJoin, L.modify([L.elems, 0], R.toUpper), splitCamelCase);
export const pascalCaseKebab = R.compose(flatJoin, L.modify([L.elems, 0], R.toUpper), R.split('-'));
export const pascalCaseConst = R.compose(flatJoin, L.modify([L.elems, 0], R.toUpper), R.split('_'), R.toLower);

export const camelCaseKebab =
  R.pipe(L.modify([L.reread(R.pipe(R.toLower, R.split('-'))),
                   L.slice(1, undefined),
                   L.elems,
                   L.index(0)], R.toUpper),
         flatJoin);

export const kebabCaseCamel =
  R.pipe(U.show,
         L.modify([L.keys,
                   L.reread(splitCamelCase),
                   L.log('%s ~> %o')],
         U.show,
         R.identity),
         U.show,
         flatJoin);

//#   transformIncomingObj :: Any -> Any
export const transformIncomingObj = L.modify(L.keys, R.unary(camelCaseKebab));

//#   transformOutgoingObj :: Any -> Any
export const transformOutgoingObj = L.modify(L.keys, kebabCaseCamel);

export const logType = t => x => {
  if (!!x[1]) {
    console.groupCollapsed(t);
    console.log(x);
    console.groupEnd();
  }
  else {
    console.warn(`No handler found for ${t} of ${x[0]}`);
  }

  return x;
}
