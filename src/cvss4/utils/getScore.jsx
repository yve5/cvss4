import { getMetric } from './getMetric';
import { getMacroVector } from './getMacroVector';
import { getEQMaxes } from './getEQMaxes';
import { extractValueMetric } from './extractValueMetric';
import { cvssLookupGlobal as lookup } from '../references/cvssLookup';
import { maxSeverity } from '../references/maxSeverity';
import { roundScore } from './roundScore';
import {
  CVSS4_AC_LEVELS,
  CVSS4_AR_LEVELS,
  CVSS4_AT_LEVELS,
  CVSS4_AV_LEVELS,
  CVSS4_CR_LEVELS,
  CVSS4_IR_LEVELS,
  CVSS4_PR_LEVELS,
  CVSS4_SA_LEVELS,
  CVSS4_SC_LEVELS,
  CVSS4_SI_LEVELS,
  CVSS4_UI_LEVELS,
  CVSS4_VA_LEVELS,
  CVSS4_VC_LEVELS,
  CVSS4_VI_LEVELS,
  CVSS4_AC,
  CVSS4_AR,
  CVSS4_AT,
  CVSS4_AV,
  CVSS4_CR,
  CVSS4_IR,
  CVSS4_PR,
  CVSS4_SA,
  CVSS4_SC,
  CVSS4_SI,
  CVSS4_UI,
  CVSS4_VA,
  CVSS4_VC,
  CVSS4_VI,
} from '../resources/constants';

export const getScore = (metrics) => {
  if (!metrics) {
    return 0.0;
  }

  const get = (metric) => getMetric(metrics, metric);

  const macroVector = getMacroVector(metrics);

  // Exception for no impact on system (shortcut)
  if (
    [CVSS4_VC, CVSS4_VI, CVSS4_VA, CVSS4_SC, CVSS4_SI, CVSS4_SA].every(
      (metric) => get(metric) === 'N'
    )
  ) {
    return 0.0;
  }

  const value = lookup[macroVector];

  // 1. For each of the EQs:
  //   a. The maximal scoring difference is determined as the difference
  //      between the current MacroVector and the lower MacroVector.
  //     i. If there is no lower MacroVector the available distance is
  //        set to NaN and then ignored in the further calculations.

  const eq1Val = parseInt(macroVector[0]);
  const eq2Val = parseInt(macroVector[1]);
  const eq3Val = parseInt(macroVector[2]);
  const eq4Val = parseInt(macroVector[3]);
  const eq5Val = parseInt(macroVector[4]);
  const eq6Val = parseInt(macroVector[5]);

  // compute next lower macro, it can also not exist
  const eq1NextLowerMacro = ''.concat(
    eq1Val + 1,
    eq2Val,
    eq3Val,
    eq4Val,
    eq5Val,
    eq6Val
  );

  const eq2NextLowerMacro = ''.concat(
    eq1Val,
    eq2Val + 1,
    eq3Val,
    eq4Val,
    eq5Val,
    eq6Val
  );

  let eq3eq6NextLowerMacro;
  let eq3eq6NextLowerMacroLeft;
  let eq3eq6NextLowerMacroRight;

  // eq3Val and eq6Val are related
  if (eq3Val === 1 && eq6Val === 1) {
    // 11 --> 21
    eq3eq6NextLowerMacro = ''.concat(
      eq1Val,
      eq2Val,
      eq3Val + 1,
      eq4Val,
      eq5Val,
      eq6Val
    );
  } else if (eq3Val === 0 && eq6Val === 1) {
    // 01 --> 11
    eq3eq6NextLowerMacro = ''.concat(
      eq1Val,
      eq2Val,
      eq3Val + 1,
      eq4Val,
      eq5Val,
      eq6Val
    );
  } else if (eq3Val === 1 && eq6Val === 0) {
    // 10 --> 11
    eq3eq6NextLowerMacro = ''.concat(
      eq1Val,
      eq2Val,
      eq3Val,
      eq4Val,
      eq5Val,
      eq6Val + 1
    );
  } else if (eq3Val === 0 && eq6Val === 0) {
    // 00 --> 01
    // 00 --> 10
    eq3eq6NextLowerMacroLeft = ''.concat(
      eq1Val,
      eq2Val,
      eq3Val,
      eq4Val,
      eq5Val,
      eq6Val + 1
    );
    eq3eq6NextLowerMacroRight = ''.concat(
      eq1Val,
      eq2Val,
      eq3Val + 1,
      eq4Val,
      eq5Val,
      eq6Val
    );
  } else {
    // 21 --> 32 (do not exist)
    eq3eq6NextLowerMacro = ''.concat(
      eq1Val,
      eq2Val,
      eq3Val + 1,
      eq4Val,
      eq5Val,
      eq6Val + 1
    );
  }

  const eq4NextLowerMacro = ''.concat(
    eq1Val,
    eq2Val,
    eq3Val,
    eq4Val + 1,
    eq5Val,
    eq6Val
  );
  const eq5NextLowerMacro = ''.concat(
    eq1Val,
    eq2Val,
    eq3Val,
    eq4Val,
    eq5Val + 1,
    eq6Val
  );

  // get their score, if the next lower macro score do not exist the result is NaN
  const scoreEq1NextLowerMacro = lookup[eq1NextLowerMacro];
  const scoreEq2NextLowerMacro = lookup[eq2NextLowerMacro];
  let scoreEq3eq6NextLowerMacro;

  if (eq3Val === 0 && eq6Val === 0) {
    // multiple path take the one with higher score
    const scoreEq3eq6NextLowerMacroLeft = lookup[eq3eq6NextLowerMacroLeft];
    const scoreEq3eq6NextLowerMacroRight = lookup[eq3eq6NextLowerMacroRight];

    if (scoreEq3eq6NextLowerMacroLeft > scoreEq3eq6NextLowerMacroRight) {
      scoreEq3eq6NextLowerMacro = scoreEq3eq6NextLowerMacroLeft;
    } else {
      scoreEq3eq6NextLowerMacro = scoreEq3eq6NextLowerMacroRight;
    }
  } else {
    scoreEq3eq6NextLowerMacro = lookup[eq3eq6NextLowerMacro];
  }

  const scoreEq4NextLowerMacro = lookup[eq4NextLowerMacro];
  const scoreEq5NextLowerMacro = lookup[eq5NextLowerMacro];

  //   b. The severity distance of the to-be scored vector from a
  //      highest severity vector in the same MacroVector is determined.
  const eq1Maxes = getEQMaxes(macroVector, 1);
  const eq2Maxes = getEQMaxes(macroVector, 2);
  const eq3Eq6Maxes = getEQMaxes(macroVector, 3)[macroVector[5]];
  const eq4Maxes = getEQMaxes(macroVector, 4);
  const eq5Maxes = getEQMaxes(macroVector, 5);

  // compose them
  const maxVectors = [];

  eq1Maxes.forEach((eq1Max) => {
    eq2Maxes.forEach((eq2Max) => {
      eq3Eq6Maxes.forEach((eq3Eq6Max) => {
        eq4Maxes.forEach((eq4Max) => {
          eq5Maxes.forEach((eq5Max) => {
            maxVectors.push(eq1Max + eq2Max + eq3Eq6Max + eq4Max + eq5Max);
          });
        });
      });
    });
  });

  // Find the max vector to use i.e. one in the combination of all the highests
  // that is greater or equal (severity distance) than the to-be scored vector.
  let continueLoop = true;
  let i = 0;

  let severityDistanceAV;
  let severityDistancePR;
  let severityDistanceUI;

  let severityDistanceAC;
  let severityDistanceAT;

  let severityDistanceVC;
  let severityDistanceVI;
  let severityDistanceVA;

  let severityDistanceSC;
  let severityDistanceSI;
  let severityDistanceSA;

  let severityDistanceCR;
  let severityDistanceIR;
  let severityDistanceAR;

  while (i < maxVectors.length && continueLoop) {
    const maxVector = maxVectors[i];

    severityDistanceAV =
      CVSS4_AV_LEVELS[get(CVSS4_AV)] -
      CVSS4_AV_LEVELS[extractValueMetric(CVSS4_AV, maxVector)];
    severityDistancePR =
      CVSS4_PR_LEVELS[get(CVSS4_PR)] -
      CVSS4_PR_LEVELS[extractValueMetric(CVSS4_PR, maxVector)];
    severityDistanceUI =
      CVSS4_UI_LEVELS[get(CVSS4_UI)] -
      CVSS4_UI_LEVELS[extractValueMetric(CVSS4_UI, maxVector)];

    severityDistanceAC =
      CVSS4_AC_LEVELS[get(CVSS4_AC)] -
      CVSS4_AC_LEVELS[extractValueMetric(CVSS4_AC, maxVector)];
    severityDistanceAT =
      CVSS4_AT_LEVELS[get(CVSS4_AT)] -
      CVSS4_AT_LEVELS[extractValueMetric(CVSS4_AT, maxVector)];

    severityDistanceVC =
      CVSS4_VC_LEVELS[get(CVSS4_VC)] -
      CVSS4_VC_LEVELS[extractValueMetric(CVSS4_VC, maxVector)];
    severityDistanceVI =
      CVSS4_VI_LEVELS[get(CVSS4_VI)] -
      CVSS4_VI_LEVELS[extractValueMetric(CVSS4_VI, maxVector)];
    severityDistanceVA =
      CVSS4_VA_LEVELS[get(CVSS4_VA)] -
      CVSS4_VA_LEVELS[extractValueMetric(CVSS4_VA, maxVector)];

    severityDistanceSC =
      CVSS4_SC_LEVELS[get(CVSS4_SC)] -
      CVSS4_SC_LEVELS[extractValueMetric(CVSS4_SC, maxVector)];
    severityDistanceSI =
      CVSS4_SI_LEVELS[get(CVSS4_SI)] -
      CVSS4_SI_LEVELS[extractValueMetric(CVSS4_SI, maxVector)];
    severityDistanceSA =
      CVSS4_SA_LEVELS[get(CVSS4_SA)] -
      CVSS4_SA_LEVELS[extractValueMetric(CVSS4_SA, maxVector)];

    severityDistanceCR =
      CVSS4_CR_LEVELS[get(CVSS4_CR)] -
      CVSS4_CR_LEVELS[extractValueMetric(CVSS4_CR, maxVector)];
    severityDistanceIR =
      CVSS4_IR_LEVELS[get(CVSS4_IR)] -
      CVSS4_IR_LEVELS[extractValueMetric(CVSS4_IR, maxVector)];
    severityDistanceAR =
      CVSS4_AR_LEVELS[get(CVSS4_AR)] -
      CVSS4_AR_LEVELS[extractValueMetric(CVSS4_AR, maxVector)];

    // if multiple maxes exist to reach it it is enough the first one
    if (
      ![
        severityDistanceAV,
        severityDistancePR,
        severityDistanceUI,
        severityDistanceAC,
        severityDistanceAT,
        severityDistanceVC,
        severityDistanceVI,
        severityDistanceVA,
        severityDistanceSC,
        severityDistanceSI,
        severityDistanceSA,
        severityDistanceCR,
        severityDistanceIR,
        severityDistanceAR,
      ].some((met) => met < 0)
    ) {
      continueLoop = false;
    }

    // if any is less than zero this is not the right max
    i += 1;
  }

  const currentSeverityDistanceeq1 =
    severityDistanceAV + severityDistancePR + severityDistanceUI;

  const currentSeverityDistanceeq2 = severityDistanceAC + severityDistanceAT;

  const currentSeverityDistanceeq3eq6 =
    severityDistanceVC +
    severityDistanceVI +
    severityDistanceVA +
    severityDistanceCR +
    severityDistanceIR +
    severityDistanceAR;

  const currentSeverityDistanceeq4 =
    severityDistanceSC + severityDistanceSI + severityDistanceSA;
  // const currentSeverityDistanceeq5 = 0;

  const step = 0.1;

  // if the next lower macro score do not exist the result is Nan
  // Rename to maximal scoring difference (aka MSD)
  const availableDistanceEq1 = value - scoreEq1NextLowerMacro;
  const availableDistanceEq2 = value - scoreEq2NextLowerMacro;
  const availableDistanceEq3eq6 = value - scoreEq3eq6NextLowerMacro;
  const availableDistanceEq4 = value - scoreEq4NextLowerMacro;
  const availableDistanceEq5 = value - scoreEq5NextLowerMacro;

  let percentToNextEq1Severity = 0;
  let percentToNextEq2Severity = 0;
  let percentToNextEq3eq6Severity = 0;
  let percentToNextEq4Severity = 0;
  let percentToNextEq5Severity = 0;

  // some of them do not exist, we will find them by retrieving the score. If score null then do not exist
  let nExistingLower = 0;

  let normalizedSeverityEq1 = 0;
  let normalizedSeverityEq2 = 0;
  let normalizedSeverityEq3eq6 = 0;
  let normalizedSeverityEq4 = 0;
  let normalizedSeverityEq5 = 0;

  // multiply by step because distance is pure
  const maxSeverityEq1 = maxSeverity.eq1[eq1Val] * step;
  const maxSeverityEq2 = maxSeverity.eq2[eq2Val] * step;
  const maxSeverityEq3eq6 = maxSeverity.eq3eq6[eq3Val][eq6Val] * step;
  const maxSeverityEq4 = maxSeverity.eq4[eq4Val] * step;

  //   c. The proportion of the distance is determined by dividing
  //      the severity distance of the to-be-scored vector by the depth
  //      of the MacroVector.
  //   d. The maximal scoring difference is multiplied by the proportion of
  //      distance.
  if (!isNaN(availableDistanceEq1)) {
    nExistingLower += 1;
    percentToNextEq1Severity = currentSeverityDistanceeq1 / maxSeverityEq1;
    normalizedSeverityEq1 = availableDistanceEq1 * percentToNextEq1Severity;
  }

  if (!isNaN(availableDistanceEq2)) {
    nExistingLower += 1;
    percentToNextEq2Severity = currentSeverityDistanceeq2 / maxSeverityEq2;
    normalizedSeverityEq2 = availableDistanceEq2 * percentToNextEq2Severity;
  }

  if (!isNaN(availableDistanceEq3eq6)) {
    nExistingLower += 1;
    percentToNextEq3eq6Severity =
      currentSeverityDistanceeq3eq6 / maxSeverityEq3eq6;
    normalizedSeverityEq3eq6 =
      availableDistanceEq3eq6 * percentToNextEq3eq6Severity;
  }

  if (!isNaN(availableDistanceEq4)) {
    nExistingLower += 1;
    percentToNextEq4Severity = currentSeverityDistanceeq4 / maxSeverityEq4;
    normalizedSeverityEq4 = availableDistanceEq4 * percentToNextEq4Severity;
  }

  if (!isNaN(availableDistanceEq5)) {
    // for eq5 is always 0 the percentage
    nExistingLower += 1;
    percentToNextEq5Severity = 0;
    normalizedSeverityEq5 = availableDistanceEq5 * percentToNextEq5Severity;
  }

  // 2. The mean of the above computed proportional distances is computed.
  let meanDistance;

  if (nExistingLower === 0) {
    meanDistance = 0;
  } else {
    // sometimes we need to go up but there is nothing there, or down but there is nothing there so it's a change of 0.
    meanDistance =
      (normalizedSeverityEq1 +
        normalizedSeverityEq2 +
        normalizedSeverityEq3eq6 +
        normalizedSeverityEq4 +
        normalizedSeverityEq5) /
      nExistingLower;
  }

  // 3. The score of the vector is the score of the MacroVector
  //    (i.e. the score of the highest severity vector) minus the mean
  //    distance so computed. This score is rounded to one decimal place.
  return roundScore(value - meanDistance);
};
