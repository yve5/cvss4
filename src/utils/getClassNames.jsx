export const getClassNames = (metrics, short, value) => {
  let classNames = 'btn btn-outline-success btn-block btn-sm';

  if (metrics && short && metrics[short] === value) {
    classNames = `${classNames} active`;
  }

  return classNames;
};
