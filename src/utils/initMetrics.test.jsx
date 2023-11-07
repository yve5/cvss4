import { initMetrics } from './initMetrics';
import { defaultMetrics } from '../resources/fakeData';
import { cvssConfig } from '../references/cvssConfig';

describe('initMetrics', () => {
  it('should initialize metrics. undefined', () => {
    expect(initMetrics(undefined)).toEqual({});
  });

  it('should initialize metrics. default', () => {
    expect(initMetrics(cvssConfig)).toEqual(defaultMetrics);
  });
});