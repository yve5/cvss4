import { CVSS4_COLORS } from '../resources/constants';

export const getClassNames = (metrics, short, value, type) => {
  let classNames = `btn btn-${CVSS4_COLORS[type] || 'primary'} btn-sm`;

  if (metrics && short && metrics[short] === value) {
    classNames = `${classNames} active`;
  }

  return classNames;
};
