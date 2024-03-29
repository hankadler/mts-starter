/* file to test eslint rules on */

import { dirname, join, resolve } from "path";

console.log(dirname(__filename));
console.log(resolve(__dirname, ".."));
console.log(join("foo", "bar"));

const objA = { one: 1, two: 2, three: 3 };

const objB = {
  one: 1,
  two: 2,
  three: 3
};

console.log({ objB });

const arr = [1, 2, 3];

const { one, two } = objA;

const [uno, dos] = arr;

const func = (arg1: number | object, arg2?: number, arg3?: number, arg4?: number) => {
  console.log({ arg1, arg2, arg3, arg4 });
};

func(one, two, uno, dos);

func({ one, two, uno, dos });
