import { getMetric } from './getMetric';

export const getMacroVector = (metrics) => {
  const getM = (metric) => getMetric(metrics, metric);

  // EQ1: 0-AV:N and PR:N and UI:N
  //      1-(AV:N or PR:N or UI:N) and not (AV:N and PR:N and UI:N) and not AV:P
  //      2-AV:P or not(AV:N or PR:N or UI:N)
  let eq1;

  if (getM('AV') === 'N' && getM('PR') === 'N' && getM('UI') === 'N') {
    eq1 = '0';
  } else if (
    (getM('AV') === 'N' || getM('PR') === 'N' || getM('UI') === 'N') &&
    !(getM('AV') === 'N' && getM('PR') === 'N' && getM('UI') === 'N') &&
    !(getM('AV') === 'P')
  ) {
    eq1 = '1';
  } else if (
    getM('AV') === 'P' ||
    !(getM('AV') === 'N' || getM('PR') === 'N' || getM('UI') === 'N')
  ) {
    eq1 = '2';
  }

  // EQ2: 0-(AC:L and AT:N)
  //      1-(not(AC:L and AT:N))
  let eq2;

  if (getM('AC') === 'L' && getM('AT') === 'N') {
    eq2 = '0';
  } else if (!(getM('AC') === 'L' && getM('AT') === 'N')) {
    eq2 = '1';
  }

  // EQ3: 0-(VC:H and VI:H)
  //      1-(not(VC:H and VI:H) and (VC:H or VI:H or VA:H))
  //      2-not (VC:H or VI:H or VA:H)
  let eq3;

  if (getM('VC') === 'H' && getM('VI') === 'H') {
    eq3 = 0;
  } else if (
    !(getM('VC') === 'H' && getM('VI') === 'H') &&
    (getM('VC') === 'H' || getM('VI') === 'H' || getM('VA') === 'H')
  ) {
    eq3 = 1;
  } else if (
    !(getM('VC') === 'H' || getM('VI') === 'H' || getM('VA') === 'H')
  ) {
    eq3 = 2;
  }

  // EQ4: 0-(MSI:S or MSA:S)
  //      1-not (MSI:S or MSA:S) and (SC:H or SI:H or SA:H)
  //      2-not (MSI:S or MSA:S) and not (SC:H or SI:H or SA:H)
  let eq4;

  if (getM('MSI') === 'S' || getM('MSA') === 'S') {
    eq4 = 0;
  } else if (
    !(getM('MSI') === 'S' || getM('MSA') === 'S') &&
    (getM('SC') === 'H' || getM('SI') === 'H' || getM('SA') === 'H')
  ) {
    eq4 = 1;
  } else if (
    !(getM('MSI') === 'S' || getM('MSA') === 'S') &&
    !(getM('SC') === 'H' || getM('SI') === 'H' || getM('SA') === 'H')
  ) {
    eq4 = 2;
  }

  // EQ5: 0-E:A
  //      1-E:P
  //      2-E:U
  let eq5;

  if (getM('E') === 'A') {
    eq5 = 0;
  } else if (getM('E') === 'P') {
    eq5 = 1;
  } else if (getM('E') === 'U') {
    eq5 = 2;
  }

  // EQ6: 0-(CR:H and VC:H) or (IR:H and VI:H) or (AR:H and VA:H)
  //      1-not[(CR:H and VC:H) or (IR:H and VI:H) or (AR:H and VA:H)]
  let eq6;

  if (
    (getM('CR') === 'H' && getM('VC') === 'H') ||
    (getM('IR') === 'H' && getM('VI') === 'H') ||
    (getM('AR') === 'H' && getM('VA') === 'H')
  ) {
    eq6 = 0;
  } else if (
    !(
      (getM('CR') === 'H' && getM('VC') === 'H') ||
      (getM('IR') === 'H' && getM('VI') === 'H') ||
      (getM('AR') === 'H' && getM('VA') === 'H')
    )
  ) {
    eq6 = 1;
  }

  return eq1 + eq2 + eq3 + eq4 + eq5 + eq6;
};
