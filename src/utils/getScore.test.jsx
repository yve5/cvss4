import { defaultMetrics } from '../resources/fakeData';
import { getScore } from './getScore';

describe('getScore', () => {
  it('should handle score. undefined', () => {
    expect(getScore(undefined)).toEqual('1.0');
  });

  it('should handle score. default', () => {
    expect(getScore(defaultMetrics)).toEqual(0);
  });
});
