import reducer from './Reducer';
import { changeValue } from '../actions/All';

const initialState = {
  metrics: {
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
  },
};

describe('Reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined)).toEqual(initialState);
  });

  it('should handle CVSS4_CHANGE_VALUE', () => {
    expect(reducer(undefined, changeValue('MSA', 'H'))).toEqual({
      ...initialState,
      type: 'CVSS4_CHANGE_VALUE',
      metrics: {
        ...initialState.metrics,
        MSA: 'H',
      },
    });
  });
});
