import reducer from './Reducer';
import { defaultMetrics } from '../../cvss4/resources/fakeData';
import { changeValue, resetScore } from '../actions/All';

const initialState = {
  metrics: defaultMetrics,
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

  it('should handle CVSS4_RESET_SCORE', () => {
    expect(reducer(undefined, resetScore())).toEqual({
      ...initialState,
      type: 'CVSS4_RESET_SCORE',
    });
  });
});
