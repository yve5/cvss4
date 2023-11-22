import { expectedMetricOrder } from '../references/metrics';
import { defaultMetrics } from '../resources/fakeData';
import { getScore } from './getScore';

describe('getScore', () => {
  it('should handle score. undefined', () => {
    expect(getScore(undefined)).toEqual(0);
  });

  it('should handle score. default', () => {
    expect(getScore(defaultMetrics)).toEqual(0);
  });

  it('should handle score. no impact on system', () => {
    expect(
      getScore({
        ...defaultMetrics,
        VC: 'H',
      })
    ).toEqual(8.7);
  });

  it('should handle score. EQ3=0 & EQ6=0', () => {
    expect(
      getScore({
        ...defaultMetrics,
        CR: 'H',
        VC: 'H',
      })
    ).toEqual(8.7);
  });

  it('should handle score. EQ3=1 & EQ6=0', () => {
    expect(
      getScore({
        ...defaultMetrics,
        VC: 'H',
        VI: 'H',
      })
    ).toEqual(9.3);
  });

  it('should handle score. EQ3=1 & EQ6=1', () => {
    expect(
      getScore({
        ...defaultMetrics,
        AC: 'H',
        AR: 'L',
        AV: 'P',
        E: 'U',
        IR: 'L',
        MAV: 'P',
        VI: 'H',
      })
    ).toEqual(0.1);
  });

  it('should handle score. EQ3=2 & EQ6=1', () => {
    expect(
      getScore({
        ...defaultMetrics,
        AC: 'H',
        AR: 'L',
        AV: 'P',
        E: 'U',
        IR: 'L',
        MAV: 'P',
        SA: 'L',
      })
    ).toEqual(0.1);
  });

  it('should handle score. EQ3=2 & EQ6=1', () => {
    expect(
      getScore({
        ...defaultMetrics,
        AC: 'H',
        AR: 'L',
        AV: 'P',
        E: 'U',
        IR: 'L',
        MAV: 'P',
        SA: 'L',
      })
    ).toEqual(0.1);
  });

  it('should handle score. EQ3=0 & EQ6=1', () => {
    expect(
      getScore({
        ...defaultMetrics,
        AR: 'L',
        CR: 'L',
        IR: 'L',
        VC: 'H',
        VI: 'H',
      })
    ).toEqual(8.8);
  });

  it('should handle score. unreported exploit maturity', () => {
    expect(
      getScore({
        ...defaultMetrics,
        AC: 'H',
        AR: 'L',
        AV: 'P',
        E: 'U',
        IR: 'L',
        MAV: 'P',
        SA: 'H',
      })
    ).toEqual(0.2);
  });

  xit('should handle score. loop', () => {
    for (let iAV = 0; iAV < expectedMetricOrder.AV.length; iAV += 1) {
      // for (let iAC = 0; iAC < expectedMetricOrder.AC.length; iAC += 1) {
      // for (let iAT = 0; iAT < expectedMetricOrder.AT.length; iAT += 1) {
      //   for (let iPR = 0; iPR < expectedMetricOrder.PR.length; iPR += 1) {
      //     for (let iUI = 0; iUI < expectedMetricOrder.UI.length; iUI += 1) {
      // for (let iVC = 0; iVC < expectedMetricOrder.VC.length; iVC += 1) {
      for (let iVI = 0; iVI < expectedMetricOrder.VI.length; iVI += 1) {
        for (let iVA = 0; iVA < expectedMetricOrder.VA.length; iVA += 1) {
          // for (let iSC = 0; iSC < expectedMetricOrder.SC.length; iSC += 1) {
          //   for (let iSI = 0; iSI < expectedMetricOrder.SI.length; iSI += 1) {
          //     for (let iSA = 0; iSA < expectedMetricOrder.SA.length; iSA += 1) {
          //       for (let iE = 0; iE < expectedMetricOrder.E.length; iE += 1) {
          // for (let iCR = 0; iCR < expectedMetricOrder.CR.length; iCR += 1) {
          for (let iIR = 0; iIR < expectedMetricOrder.IR.length; iIR += 1) {
            for (let iAR = 0; iAR < expectedMetricOrder.MSA.length; iAR += 1) {
              // for (
              //   let iMAV = 0;
              //   iMAV < expectedMetricOrder.MAV.length;
              //   iMAV += 1
              // ) {
              expect(
                getScore({
                  ...defaultMetrics,
                  AV: expectedMetricOrder.AV[iAV],
                  // AC: expectedMetricOrder.AC[iAC],
                  // AT: expectedMetricOrder.AT[iAT],
                  // PR: expectedMetricOrder.PR[iPR],
                  // UI: expectedMetricOrder.UI[iUI],
                  VC: 'H',
                  VI: expectedMetricOrder.VI[iVI],
                  VA: expectedMetricOrder.VA[iVA],
                  // SC: expectedMetricOrder.SC[iSC],
                  // SI: expectedMetricOrder.SI[iSI],
                  // SA: expectedMetricOrder.SA[iSA],
                  // E: expectedMetricOrder.E[iE],
                  CR: 'H',
                  IR: expectedMetricOrder.IR[iIR],
                  AR: expectedMetricOrder.AR[iAR],
                  // MAV: expectedMetricOrder.MAV[iMAV],
                })
              ).not.toEqual(undefined);
            }
          }
        }
      }
    }
    // }
    // }
    // }
    // }
    // }
    // }
    // }
    // }
    // }
    // }
    // }

    // MAC: ['X', 'L', 'H'],
    // MAT: ['X', 'N', 'P'],
    // MPR: ['X', 'N', 'L', 'H'],
    // MUI: ['X', 'N', 'P', 'A'],
    // MVC: ['X', 'H', 'L', 'N'],
    // MVI: ['X', 'H', 'L', 'N'],
    // MVA: ['X', 'H', 'L', 'N'],
    // MSC: ['X', 'H', 'L', 'N'],
    // MSI: ['X', 'S', 'H', 'L', 'N'],
    // MSA: ['X', 'S', 'H', 'L', 'N'],
    // S: ['X', 'N', 'P'],
    // AU: ['X', 'N', 'Y'],
    // R: ['X', 'A', 'U', 'I'],
    // V: ['X', 'D', 'C'],
    // RE: ['X', 'L', 'M', 'H'],
    // U: ['X', 'Clear', 'Green', 'Amber', 'Red'],
  });
});
