import { getDefaultMetrics } from './getDefaultMetrics';
import { defaultMetrics } from '../resources/fakeData';

describe('getDefaultMetrics', () => {
  it('should initialize metrics', () => {
    expect(getDefaultMetrics()).toEqual(defaultMetrics);
  });
});
