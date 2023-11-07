import { CVSS4_CHANGE_VALUE, CVSS4_RESET_SCORE } from '../resources/constants';
import { cvssConfig } from '../references/cvssConfig';
import { initMetrics } from '../utils';

export const changeValue = (metric, value) => ({
  type: CVSS4_CHANGE_VALUE,
  metric,
  value,
});

export const resetScore = () => ({
  type: CVSS4_RESET_SCORE,
  metrics: initMetrics(cvssConfig),
});
