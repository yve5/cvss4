import { initMetrics } from './initMetrics';
import { cvssConfig } from '../references/cvssConfig';

describe('initMetrics', () => {
  it('should initialize metrics. undefined', () => {
    expect(initMetrics(undefined)).toEqual({});
  });

  it('should initialize metrics. default', () => {
    expect(initMetrics(cvssConfig)).toEqual({
      AC: 'L',
      AR: 'X',
      AT: 'N',
      AU: 'X',
      AV: 'N',
      CR: 'X',
      E: 'X',
      IR: 'X',
      MAC: 'X',
      MAT: 'X',
      MAV: 'X',
      MPR: 'X',
      MSA: 'X',
      MSC: 'X',
      MSI: 'X',
      MUI: 'X',
      MVA: 'X',
      MVC: 'X',
      MVI: 'X',
      PR: 'N',
      R: 'X',
      RE: 'X',
      S: 'X',
      SA: 'N',
      SC: 'N',
      SI: 'N',
      U: 'X',
      UI: 'N',
      V: 'X',
      VA: 'N',
      VC: 'N',
      VI: 'N',
    });
  });
});
