import { input } from "./input.js";

export default function () {
  const lines = input.split("\n");
  let part1 = 0;
  let part2 = 0;
  const cardInstances = new Array(lines.length).fill(1);
  lines.forEach((line, idx) => {
    const [, winning, card] = line.split(/[:|]/g);

    const winningNums = winning.trim().split(/\s+/).map(Number);
    const cardNums = card.trim().split(/\s+/).map(Number);
    const matchCount = cardNums.filter((num) =>
      winningNums.includes(num)
    ).length;
    if (matchCount) {
      const points = 2 ** (matchCount - 1);
      part1 += points;
      for (let i = idx + 1; i <= idx + matchCount; i++) {
        cardInstances[i] += cardInstances[idx];
      }
    }
  });
  part2 = cardInstances.reduce((acc, v) => acc + v, 0);
  console.log("--- Day 04 ---");
  console.log("Part One: " + part1);
  console.log("Part two: " + part2);
}
