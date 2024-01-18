export const roundScore = (score) => {
  let result = 0.0;

  if (score) {
    result = score;

    if (result < 0) {
      result = 0.0;
    } else if (result > 10) {
      result = 10.0;
    }

    result = Math.round(result * 10) / 10;
  }

  return result;
};
