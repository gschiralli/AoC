import { input } from "./input.js";

const MAX_COUNT = {
  red: 12,
  green: 13,
  blue: 14,
};

//Part One
function partOne() {
  let lines = input.trim().split("\n");
  const res = lines
    .map((line) => {
      return line
        .split(": ")[1]
        .split("; ")
        .map((set) => {
          const pulls = set.trim().split(", ");
          return pulls.every((pull) => {
            const [count, colour] = pull.split(" ");
            return MAX_COUNT[colour] >= Number(count);
          });
        })
        .every((p) => p);
    })
    .reduce((s, result, i) => {
      return result ? s + (i + 1) : s;
    });
  console.log(res);
}

//Part Two
export default function () {
  console.log("--- Day 02 ---");
  let lines = input.trim().split("\n");
  const res = lines
    .map((line) => {
      let maxCount = {
        red: 0,
        green: 0,
        blue: 0,
      };
      line
        .split(": ")[1]
        .split("; ")
        .forEach((set) => {
          const pulls = set.trim().split(", ");
          pulls.forEach((pull) => {
            const [count, colour] = pull.split(" ");
            maxCount[colour] = Math.max(count, maxCount[colour]);
          });
        });
      const { red, green, blue } = maxCount;
      return red * green * blue;
    })
    .reduce((s, result) => s + result, 0);
  console.log("Solution: ", res);
}
