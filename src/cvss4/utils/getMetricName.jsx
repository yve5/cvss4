import { cvssConfig } from '../references/cvssConfig';

export const getMetricName = (short) => {
  let name;

  if (short) {
    Object.values(cvssConfig).forEach(({ metric_groups: metricGroups }) => {
      Object.values(metricGroups).forEach((metricGroupData) => {
        Object.entries(metricGroupData).forEach(
          ([metricDataKey, metricData]) => {
            if (short === metricData.short) {
              name = metricDataKey;
            }
          }
        );
      });
    });
  }

  return name;
};
