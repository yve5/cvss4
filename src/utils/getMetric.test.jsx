import { getMetric } from './getMetric';

const metrics = {
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
};

describe('getMetric', () => {
  it('should handle metric. undefined', () => {
    expect(getMetric(undefined)).toEqual(undefined);
    expect(getMetric(metrics, undefined)).toEqual(undefined);
  });

  it('should handle metric. default', () => {
    expect(getMetric(metrics, 'AV')).toEqual('N');
  });

  it('should handle metric. E:C', () => {
    expect(getMetric(metrics, 'E')).toEqual('A');
  });

  it('should handle metric. CR:X', () => {
    expect(getMetric(metrics, 'CR')).toEqual('H');
  });

  it('should handle metric. IR:X', () => {
    expect(getMetric(metrics, 'IR')).toEqual('H');
  });

  it('should handle metric. AR:X', () => {
    expect(getMetric(metrics, 'AR')).toEqual('H');
  });

  it('should handle metric. MAT:X', () => {
    expect(getMetric(metrics, 'AT')).toEqual('N');
  });

  it('should handle metric. MAT:P', () => {
    expect(getMetric({ ...metrics, MAT: 'P' }, 'AT')).toEqual('P');
  });
});
