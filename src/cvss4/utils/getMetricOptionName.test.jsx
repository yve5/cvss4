import { getMetricOptionName } from './getMetricOptionName';

describe('getMetricOptionName', () => {
  it('should get metric option name. undefined', () => {
    expect(getMetricOptionName(undefined)).toEqual(undefined);
    expect(getMetricOptionName('AC', undefined)).toEqual(undefined);
  });

  it('should get metric option name. AC:H', () => {
    expect(getMetricOptionName('AC', 'H')).toEqual('High (H)');
  });

  it('should get metric option name. R:A', () => {
    expect(getMetricOptionName('R', 'A')).toEqual('Automatic (A)');
  });
});
