const log = console.log;

const reduce = (f, acc, iter) => {
  // reduce의 내부에서 재귀적으로 callback 함수를 호출

  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
};

const filter = (f, iter) => {
  let res = [];

  for (const a of iter) {
    if (f(a)) res.push(a);
  }

  return res;
};

const map = (f, iter) => {
  let res = [];

  for (const a of iter) {
    res.push(f(a));
  }

  return res;
};
