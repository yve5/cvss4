import reducer from './Reducer';
import { defaultMetrics } from '../resources/fakeData';
import { changeValue } from '../actions/All';

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
});
