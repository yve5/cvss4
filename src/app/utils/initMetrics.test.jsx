import { initMetrics } from './initMetrics';
import { defaultMetrics } from '../../cvss4/resources/fakeData';
import { cvssConfig } from '../../references/cvssConfig';

describe('initMetrics', () => {
  it('should initialize metrics. undefined', () => {
    expect(initMetrics(undefined)).toEqual({});
  });

  it('should initialize metrics. default', () => {
    expect(initMetrics(cvssConfig)).toEqual(defaultMetrics);
  });
});
