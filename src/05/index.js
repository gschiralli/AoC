import { input } from "./input.js";

export default function () {
  const seeds = input
    .replace(/\n/g, "")
    .match(/seeds: ([\d\s]+)/)[1]
    .split(" ")
    .map((x) => +x);

  const maps = input
    .trim()
    .split(/\n+[a-z\-]+ map:\r\n/)
    .splice(1)
    .map((x) => x.split(/\n/).map((y) => y.split(" ").map((z) => +z)));

  let finalNumbers = [];

  seeds.forEach((seed) => {
    let currentNumber = seed;
    maps.forEach((mapx) => {
      for (const set of mapx) {
        if (currentNumber >= set[1] && currentNumber < set[1] + set[2]) {
          currentNumber = set[0] + (currentNumber - set[1]);

          break;
        }
      }
    });
    finalNumbers.push(currentNumber);
  });
  console.log("Solution: ", Math.min(...finalNumbers));
}
