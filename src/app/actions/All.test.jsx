import { changeValue, resetScore } from './All';
import { defaultMetrics } from '../../cvss4/resources/fakeData';

describe('Actions', () => {
  it('should handle CVSS4_CHANGE_VALUE', () => {
    expect(changeValue('AV', 'A')).toEqual({
      type: 'CVSS4_CHANGE_VALUE',
      metric: 'AV',
      value: 'A',
    });
  });

  it('should handle CVSS4_RESET_SCORE', () => {
    expect(resetScore(undefined)).toEqual({
      type: 'CVSS4_RESET_SCORE',
      metrics: defaultMetrics,
    });
  });
});
