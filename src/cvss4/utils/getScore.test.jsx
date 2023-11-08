import { defaultMetrics } from '../resources/fakeData';
import { getScore } from './getScore';

describe('getScore', () => {
  it('should handle score. undefined', () => {
    expect(getScore(undefined)).toEqual(0);
  });

  it('should handle score. default', () => {
    expect(getScore({ ...defaultMetrics })).toEqual(0);
  });

  it('should handle score. no impact on system', () => {
    expect(getScore({ ...defaultMetrics, VC: 'H' })).toEqual('8.7');
  });

  it('should handle score. EQ3=0 & EQ6=0', () => {
    expect(getScore({ ...defaultMetrics, CR: 'H', VC: 'H' })).toEqual('8.7');
  });

  it('should handle score. EQ3=1 & EQ6=0', () => {
    expect(getScore({ ...defaultMetrics, VC: 'H', VI: 'H' })).toEqual('9.3');
  });
});
