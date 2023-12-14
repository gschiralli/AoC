import { data } from "./input.js";
function partOne() {
  console.log("--- Day 05 ---");
  const seeds = data
    .replace(/\n/g, "")
    .match(/seeds: ([\d\s]+)/)[1]
    .split(" ")
    .map((x) => +x);

  const maps = data
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
  console.log("Part One: ", Math.min(...finalNumbers));
}

export default function () {
  partOne();
  const input = data.split("\n\n");
  const seeds = input[0]
    .split(": ")[1]
    .split(" ")
    .map((x) => parseInt(x))
    .reduce((a, x, i) => {
      if (i % 2 == 0) a.push([]);
      return a[a.length - 1].push(x), a;
    }, []);

  const maps = input.slice(1).map((x) =>
    x
      .split("\n")
      .slice(1)
      .map((y) => y.split(" ").map((z) => parseInt(z)))
  );

  const resultArray = [];

  function expand(index, values) {
    if (index == maps.length) return [values];

    const result = [];
    for (const [destination, source, range] of maps[index]) {
      if (
        values[0] < source &&
        values[0] + values[1] > source &&
        values[0] + values[1] <= source + range
      ) {
        const firstTuple = [values[0], source - values[0]];
        const lastTuple = [destination, values[1] - source + values[0]];
        result.push(
          ...expand(index + 1, lastTuple),
          ...expand(index, firstTuple)
        );
        break;
      } else if (
        values[0] >= source &&
        values[0] < source + range &&
        values[0] + values[1] > source + range
      ) {
        const firstTuple = [
          destination + values[0] - source,
          source + range - values[0],
        ];
        const lastTuple = [
          source + range,
          values[0] + values[1] - source - range,
        ];
        result.push(
          ...expand(index + 1, firstTuple),
          ...expand(index, lastTuple)
        );
        break;
      } else if (
        values[0] >= source &&
        values[0] + values[1] <= source + range
      ) {
        result.push(
          ...expand(index + 1, [destination + values[0] - source, values[1]])
        );
        break;
      } else if (values[0] < source && values[0] + values[1] > source + range) {
        const firstTuple = [values[0], source - values[0]];
        const middleTuple = [destination, range];
        const lastTuple = [
          source + range,
          values[0] + values[1] - source - range,
        ];
        result.push(
          ...expand(index, lastTuple),
          ...expand(index + 1, middleTuple),
          ...expand(index, firstTuple)
        );
        break;
      }
    }

    if (result.length == 0) result.push(...expand(index + 1, values));
    return result;
  }

  for (const seed of seeds) {
    resultArray.push(expand(0, seed));
  }

  console.log("Part two: ", Math.min(...resultArray.flat().map((x) => x[0])));
}
