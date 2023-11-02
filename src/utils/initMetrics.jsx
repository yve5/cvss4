export const initMetrics = (config) => {
  const metrics = {};

  if (config) {
    Object.values(config).forEach(({ metric_groups: metricGroups }) => {
      Object.values(metricGroups).forEach((metricGroupData) => {
        Object.values(metricGroupData).forEach((metricData) => {
          metrics[metricData?.short] = metricData?.selected;
        });
      });
    });
  }

  return metrics;
};
