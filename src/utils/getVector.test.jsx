import { defaultMetrics } from '../resources/fakeData';
import { getVector } from './getVector';

describe('getVector', () => {
  it('should get vector. undefined', () => {
    expect(getVector(undefined)).toEqual('CVSS:4.0');
  });

  it('should get vector. default', () => {
    expect(getVector(defaultMetrics)).toEqual(
      'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:N/VI:N/VA:N/SC:N/SI:N/SA:N'
    );
  });
});
