import { cvssConfig } from '../references/cvssConfig';

export const getDefaultMetrics = () => {
  const metrics = {};

  Object.values(cvssConfig).forEach(({ metric_groups: metricGroups }) => {
    Object.values(metricGroups).forEach((metricGroupData) => {
      Object.values(metricGroupData).forEach((metricData) => {
        metrics[metricData?.short] = metricData?.selected;
      });
    });
  });

  return metrics;
};
