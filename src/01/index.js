import { input } from "./input.js";

export default function () {
  console.log("--- Day 01 ---");

  const lines = input.split("\n");

  let res = 0;
  let words = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];

  lines.forEach((line) => {
    let nums = [];

    line
      .trim()
      .split("")
      .forEach((ch, i) => {
        if (!isNaN(ch)) {
          nums.push(ch);
        }
        for (const [idx, val] of words.entries()) {
          if (line.slice(i).startsWith(val)) {
            nums.push(String(idx + 1));
          }
        }
      });
    let digit = nums.at(0) + nums.at(-1);
    if (parseInt(digit)) {
      res += parseInt(digit);
    }
  });

  console.log(`solution: ${res}`);
}
