import { extractValueMetric } from './extractValueMetric';

const fakeVector =
  'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:N/VI:N/VA:N/SC:N/SI:N/SA:N';

describe('extractValueMetric', () => {
  it('should extract metric value. undefined', () => {
    expect(extractValueMetric(undefined)).toEqual('');
    expect(extractValueMetric('UI', undefined)).toEqual('');
  });

  it('should extract metric value. default', () => {
    expect(extractValueMetric('UI', fakeVector)).toEqual('N');
  });

  it('should extract metric value. last metric', () => {
    expect(extractValueMetric('SA', fakeVector)).toEqual('N');
  });
});
