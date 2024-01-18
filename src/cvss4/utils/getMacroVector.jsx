import { getMetric } from './getMetric';

export const getMacroVector = (metrics) => {
  const get = (metric) => getMetric(metrics, metric);

  // EQ1: 0-AV:N and PR:N and UI:N
  //      1-(AV:N or PR:N or UI:N) and not (AV:N and PR:N and UI:N) and not AV:P
  //      2-AV:P or not(AV:N or PR:N or UI:N)
  const AV = get('AV');
  const PR = get('PR');
  const UI = get('UI');
  let eq1 = '2';

  if (AV === 'N' && PR === 'N' && UI === 'N') {
    eq1 = '0';
  } else if (
    (AV === 'N' || PR === 'N' || UI === 'N') &&
    !(AV === 'N' && PR === 'N' && UI === 'N') &&
    !(AV === 'P')
  ) {
    eq1 = '1';
  }

  // EQ2: 0-(AC:L and AT:N)
  //      1-(not(AC:L and AT:N))
  const AC = get('AC');
  const AT = get('AT');
  let eq2 = '1';

  if (AC === 'L' && AT === 'N') {
    eq2 = '0';
  }

  // EQ3: 0-(VC:H and VI:H)
  //      1-(not(VC:H and VI:H) and (VC:H or VI:H or VA:H))
  //      2-not (VC:H or VI:H or VA:H)
  const VA = get('VA');
  const VC = get('VC');
  const VI = get('VI');
  let eq3 = 2;

  if (VC === 'H' && VI === 'H') {
    eq3 = 0;
  } else if (
    !(VC === 'H' && VI === 'H') &&
    (VC === 'H' || VI === 'H' || VA === 'H')
  ) {
    eq3 = 1;
  }

  // EQ4: 0-(MSI:S or MSA:S)
  //      1-not (MSI:S or MSA:S) and (SC:H or SI:H or SA:H)
  //      2-not (MSI:S or MSA:S) and not (SC:H or SI:H or SA:H)
  const MSA = get('MSA');
  const MSI = get('MSI');
  const SA = get('SA');
  const SC = get('SC');
  const SI = get('SI');
  let eq4 = 2;

  if (MSI === 'S' || MSA === 'S') {
    eq4 = 0;
  } else if (
    !(MSI === 'S' || MSA === 'S') &&
    (SC === 'H' || SI === 'H' || SA === 'H')
  ) {
    eq4 = 1;
  }

  // EQ5: 0-E:A
  //      1-E:P
  //      2-E:U
  const E = get('E');
  let eq5 = 0;

  if (E === 'P') {
    eq5 = 1;
  } else if (E === 'U') {
    eq5 = 2;
  }

  // EQ6: 0-(CR:H and VC:H) or (IR:H and VI:H) or (AR:H and VA:H)
  //      1-not[(CR:H and VC:H) or (IR:H and VI:H) or (AR:H and VA:H)]
  const AR = get('AR');
  const CR = get('CR');
  const IR = get('IR');
  let eq6 = 1;

  if (
    (CR === 'H' && VC === 'H') ||
    (IR === 'H' && VI === 'H') ||
    (AR === 'H' && VA === 'H')
  ) {
    eq6 = 0;
  }

  return eq1 + eq2 + eq3 + eq4 + eq5 + eq6;
};
