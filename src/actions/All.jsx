import { CVSS4_CHANGE_VALUE } from '../resources/constants';

export const changeValue = (metric, value) => ({
  type: CVSS4_CHANGE_VALUE,
  metric,
  value,
});
