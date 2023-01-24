const log = console.log;

const add = (a, b) => a + b

const L = {};

L.map = function *(f, iter){
  for(const a of iter) yield f(a);
};

L.filter = function *(f, iter){
  for(const a of iter) if(f(a)) yield a;
};

const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);


const reduce = curry((f, acc, iter) => {
  // reduce의 내부에서 재귀적으로 callback 함수를 호출

  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe =
  (f, ...fs) =>
    (...as) =>
      go(f(...as), ...fs);

const take = curry((l, iter) => {
  let res = [];

  iter = iter[Symbol.iterator]()

  let curr;

  while(!(curr = iter.next()).done){
    res.push(curr.value)
    if(res.length == l) return res
  }

  // for(const a of iter){
  //   res.push(a);
  //   if(res.length == l) return res;
  // }

  return res;
});

const takeAll = take(Infinity);

// const filter = curry((f, iter) => {
//   let res = [];
//
//   for (const a of iter) {
//     if (f(a)) res.push(a);
//   }
//
//   return res;
// });

const filter = curry(pipe(L.filter, takeAll));

// const map = curry((f, iter) => {
//   let res = [];
//
//   for (const a of iter) {
//     res.push(f(a));
//   }
//
//   return res;
// });

const map = curry(pipe(L.map, takeAll))

const find = curry((f, iter) => go(
  iter,
  L.filter(f),
  take(1),
  ([a]) => a));

const join = curry((sep = ',', iter) => reduce((a,b) => `${a}${sep}${b}`, iter));

L.entries = function *(obj){
  for (const k in obj) yield [k, obj[k]];
};

const isIterable = a => a && a[Symbol.iterator];

L.flatten = function *(iter){
  for(const a of iter){
    if(isIterable(a)) yield *a;
    else yield a;
  }
}

const flatten = pipe(L.flatten, takeAll)

L.deepFlat = function *f(iter){
  for(const a of iter){
    if(isIterable(a)) yield *f(a);
    else yield a;
  }
}
