import { defaultMetrics } from '../resources/fakeData';
import { getMetric } from './getMetric';

describe('getMetric', () => {
  it('should handle metric. undefined', () => {
    expect(getMetric(undefined)).toEqual(undefined);
    expect(getMetric(defaultMetrics, undefined)).toEqual(undefined);
  });

  it('should handle metric. default', () => {
    expect(getMetric(defaultMetrics, 'AV')).toEqual('N');
  });

  it('should handle metric. E:C', () => {
    expect(getMetric(defaultMetrics, 'E')).toEqual('A');
  });

  it('should handle metric. CR:X', () => {
    expect(getMetric(defaultMetrics, 'CR')).toEqual('H');
  });

  it('should handle metric. IR:X', () => {
    expect(getMetric(defaultMetrics, 'IR')).toEqual('H');
  });

  it('should handle metric. AR:X', () => {
    expect(getMetric(defaultMetrics, 'AR')).toEqual('H');
  });

  it('should handle metric. MAT:X', () => {
    expect(getMetric(defaultMetrics, 'AT')).toEqual('N');
  });

  it('should handle metric. MAT:P', () => {
    expect(getMetric({ ...defaultMetrics, MAT: 'P' }, 'AT')).toEqual('P');
  });
});
