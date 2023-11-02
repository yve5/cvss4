import { getClassNames } from './getClassNames';

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

describe('getClassNames', () => {
  it('should get button classnames. undefined', () => {
    expect(getClassNames(undefined)).toEqual(
      'btn btn-outline-success btn-block btn-sm'
    );
  });

  it('should initialize metrics. default', () => {
    expect(getClassNames(metrics, 'MAV', 'H')).toEqual(
      'btn btn-outline-success btn-block btn-sm'
    );
  });

  it('should initialize metrics. active', () => {
    expect(getClassNames(metrics, 'MAV', 'X')).toEqual(
      'btn btn-outline-success btn-block btn-sm active'
    );
  });
});
