import { input } from "./input.js";

function partOne() {
  const lines = input.split("\n").map((line) => line.trimEnd());
  const time = lines[0]
    .split(": ")[1]
    .split(" ")
    .filter((x) => x != "")
    .map((x) => +x);
  const distance = lines[1]
    .split(": ")[1]
    .split(" ")
    .filter((x) => x != "")
    .map((x) => +x);

  const timeMap = {};
  time.forEach((t, timeIdx) => {
    timeMap[t.toString() + "-" + timeIdx] = 0;

    let currentTime = t - 1;
    for (let i = 1; i < t; i++) {
      if (currentTime * i > distance[timeIdx]) {
        timeMap[t.toString() + "-" + timeIdx] += 1;
      }
      --currentTime;
    }
  });
  1;

  console.log(
    "Part One:",
    Object.values(timeMap).reduce((prev, current) => prev * current)
  );
}

export default function solve() {
  console.log("--- Day 06 ---");
  partOne();
  const lines = input.split("\n").map((line) => line.trimEnd());
  const time = +lines[0]
    .split(": ")[1]
    .split(" ")
    .filter((x) => x != "")
    .join("");

  const distance = +lines[1]
    .split(": ")[1]
    .split(" ")
    .filter((x) => x != "")
    .join("");

  let res = 0;
  for (let i = 0; i < time; i++) {
    const newDistance = (time - i) * i;
    if (newDistance > distance) res++;
  }
  console.log("Part Two: ", res);
}

solve();
