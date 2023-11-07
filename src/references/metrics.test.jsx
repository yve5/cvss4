import { expectedMetricOrder } from './metrics';

describe('metrics', () => {
  it('should stock expectedMetricOrder', () => {
    expect(Object.keys(expectedMetricOrder).length).toEqual(32);
  });
});
