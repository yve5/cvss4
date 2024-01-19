import { cvssConfig } from '../references/cvssConfig';

export const getMetricOptionName = (short, value) => {
  let name;

  if (short && value) {
    Object.values(cvssConfig).forEach(({ metric_groups: metricGroups }) => {
      Object.values(metricGroups).forEach((metricGroupData) => {
        Object.values(metricGroupData).forEach((metric) => {
          if (short === metric.short) {
            Object.values(metric).forEach((options) => {
              Object.entries(options).forEach(([key, option]) => {
                if (value === option.value) {
                  name = key;
                }
              });
            });
          }
        });
      });
    });
  }

  return name;
};
