import { expectedMetricOrder } from '../references/metrics';

export const getVector = (metrics) => {
  let vector = 'CVSS:4.0';

  if (metrics) {
    Object.keys(expectedMetricOrder).forEach((metric) => {
      const selected = metrics[metric];

      if (selected !== 'X') {
        vector = vector.concat(`/${metric}:${selected}`);
      }
    });
  }

  return vector;
};
