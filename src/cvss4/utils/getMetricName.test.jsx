import { getMetricName } from './getMetricName';

describe('getMetricName', () => {
  it('should get metric name. undefined', () => {
    expect(getMetricName(undefined)).toEqual(undefined);
  });

  it('should get metric name. AC', () => {
    expect(getMetricName('AC')).toEqual('Attack Complexity (AC)');
  });

  it('should get metric name. R', () => {
    expect(getMetricName('R')).toEqual('Recovery (R)');
  });
});
