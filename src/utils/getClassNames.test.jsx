import { defaultMetrics } from '../resources/fakeData';
import { getClassNames } from './getClassNames';

describe('getClassNames', () => {
  it('should get button classnames. undefined', () => {
    expect(getClassNames(undefined)).toEqual(
      'btn btn-outline-success btn-block btn-sm'
    );
  });

  it('should initialize metrics. default', () => {
    expect(getClassNames(defaultMetrics, 'MAV', 'H')).toEqual(
      'btn btn-outline-success btn-block btn-sm'
    );
  });

  it('should initialize metrics. active', () => {
    expect(getClassNames(defaultMetrics, 'MAV', 'X')).toEqual(
      'btn btn-outline-success btn-block btn-sm active'
    );
  });
});
