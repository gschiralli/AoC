import { input } from "./input.js";

function checkAdj(matrix, i, j) {
  const regExp = new RegExp(/[\d\.]/);

  if (!regExp.test(matrix[i][0].charAt(j))) {
    return true;
  }
  //check left
  if (j !== 0) {
    if (!regExp.test(matrix[i][0].charAt(j - 1))) {
      return true;
    }
  }
  //check right
  if (j !== matrix[i][0].length - 1) {
    if (!regExp.test(matrix[i][0].charAt(j + 1))) {
      return true;
    }
  }
  //check top
  if (i !== 0) {
    if (!regExp.test(matrix[i - 1][0].charAt(j))) {
      return true;
    }
    //check diagonally top right
    if (j !== matrix[i][0].length - 1) {
      if (!regExp.test(matrix[i - 1][0].charAt(j + 1))) {
        return true;
      }
    }
    //check diagonally top left
    if (j !== 0) {
      if (!regExp.test(matrix[i - 1][0].charAt(j - 1))) {
        return true;
      }
    }
  }
  //check bottom
  if (i !== matrix.length - 1) {
    if (!regExp.test(matrix[i + 1][0].charAt(j))) {
      return true;
    }
    //check diagonally bottom right
    if (j !== matrix[i][0].length - 1) {
      if (!regExp.test(matrix[i + 1][0].charAt(j + 1))) {
        return true;
      }
    }
    //check diagonally bottom left
    if (j !== 0) {
      if (!regExp.test(matrix[i + 1][0].charAt(j - 1))) {
        return true;
      }
    }
  }
}

export default function () {
  const lines = input.split("\n");
  let ans = 0;
  const matrix = lines.map((line) => {
    return [line.trim()];
  });

  const digitRegex = /\d/;

  for (let i = 0; i < matrix.length; i++) {
    let digit = "";
    for (let j = 0; j < matrix[i][0].length; j++) {
      if (digitRegex.test(matrix[i][0].charAt(j))) {
        digit += matrix[i][0].charAt(j);
      } else if (digit) {
        for (let start = j - digit.length; start < j; start++) {
          if (checkAdj(matrix, i, start)) {
            ans += Number(digit);
            break;
          }
        }
        digit = "";
      }
    }
  }
}
