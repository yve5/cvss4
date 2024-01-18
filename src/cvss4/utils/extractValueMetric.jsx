export const extractValueMetric = (metric, vector) => {
  let result = '';

  if (metric && vector) {
    // indexOf gives first index of the metric, we then need to go over its size
    const extracted = vector.slice(vector.indexOf(metric) + metric.length + 1);

    // remove what follow
    if (extracted.indexOf('/') > 0) {
      result = extracted.substring(0, extracted.indexOf('/'));
    } else {
      // case where it is the last metric so no ending /
      result = extracted;
    }
  }

  return result;
};
