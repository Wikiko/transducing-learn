const { curry } = require('ramda');

const curriedFilterReducer = curry((predicateFn, combinerFn) => (list, val) => {
    if (predicateFn(val)) return combinerFn(list, val);
    return list;
});

const curriedMapReducer = curry((mapperFn, combinerFn) => (list, val) => combinerFn(list, mapperFn(val)));

const listCombine = (list, val) => [...list, val];

const isLongEnough = str => str.length > 10;
const isShortEnough = str => str.length < 7;
const strToUpperCase = str => str.toUpperCase();

const isLongEnoughReducer = curriedFilterReducer(isLongEnough)(listCombine);
const isShortEnoughReducer = curriedFilterReducer(isShortEnough)(listCombine);
const strToUpperCaseReducer = curriedMapReducer(strToUpperCase)(listCombine);

const x = curriedMapReducer(strToUpperCase);
const y = curriedFilterReducer(isLongEnough);
const z = curriedFilterReducer(isShortEnough);

const names = ['hello', 'padaria', 'pedreiro', 'empreiteira', 'construtora'];

const strToUpperReducer = x(listCombine);
const shortEnoughReducer = z(listCombine);
const shortAndlongEnoughReducer = y(shortEnoughReducer);
const toUpperAndlongEnoughReducer = y(strToUpperReducer);

const teste = names.reduce(toUpperAndlongEnoughReducer, []);

console.log(teste);

// Using ramda \/.

const { append, flip, transduce, map, filter, compose } = require('ramda');

const transducer = compose(map(strToUpperCase), filter(isLongEnough));

console.log(transduce(transducer, flip(append), [], names));