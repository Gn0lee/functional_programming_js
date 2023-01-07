const log = console.log;

const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const go = (...args) => reduce((a, f) => f(a), args);

const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

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

const filter = curry((f, iter) => {
  let res = [];

  for (const a of iter) {
    if (f(a)) res.push(a);
  }

  return res;
});

const map = curry((f, iter) => {
  let res = [];

  for (const a of iter) {
    res.push(f(a));
  }

  return res;
});
