export const extractValueMetric = (metric, vector) => {
  if (!metric || !vector) {
    return '';
  }

  let value;

  // indexOf gives first index of the metric, we then need to go over its size
  const extracted = vector.slice(vector.indexOf(metric) + metric.length + 1);

  // remove what follow
  if (extracted.indexOf('/') > 0) {
    value = extracted.substring(0, extracted.indexOf('/'));
  } else {
    // case where it is the last metric so no ending /
    value = extracted;
  }

  return value;
};
