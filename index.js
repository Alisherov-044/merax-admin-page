const arr = [1, 2, 3, 4, "sdf"];

const reversed = arr.reduce(
  (acc, cur) => [
    typeof cur === "string"
      ? cur
          .split("")
          .reduce((inAcc, inCur) => [inCur, ...inAcc], [])
          .join("")
      : cur,
    ...acc,
  ],
  []
);

console.log(reversed);
