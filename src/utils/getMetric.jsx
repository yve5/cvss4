export const getMetric = (metrics, metric) => {
  let selected;

  if (metrics && metrics) {
    selected = metrics[metric];

    // If E=X it will default to the worst case i.e. E=A
    if (metric === 'E' && selected === 'X') {
      return 'A';
    }

    // If CR=X, IR=X or AR=X they will default to the worst case i.e. CR=H, IR=H and AR=H
    if (metric === 'CR' && selected === 'X') {
      return 'H';
    }

    // IR:X is the same as IR:H
    if (metric === 'IR' && selected === 'X') {
      return 'H';
    }

    // AR:X is the same as AR:H
    if (metric === 'AR' && selected === 'X') {
      return 'H';
    }

    // All other environmental metrics just overwrite base score values,
    // so if they’re not defined just use the base score value.
    const newMetric = `M${metric}`;

    if (Object.keys(metrics).includes(newMetric)) {
      const modifiedSelected = metrics[newMetric];

      if (modifiedSelected !== 'X') {
        return modifiedSelected;
      }
    }
  }

  return selected;
};
