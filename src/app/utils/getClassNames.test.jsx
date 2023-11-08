import { defaultMetrics } from '../../cvss4/resources/fakeData';
import { getClassNames } from './getClassNames';

describe('getClassNames', () => {
  it('should get button classnames. undefined', () => {
    expect(getClassNames(undefined)).toEqual('btn btn-primary btn-sm');
  });

  it('should initialize metrics. default', () => {
    expect(getClassNames(defaultMetrics, 'MAV', 'H')).toEqual(
      'btn btn-primary btn-sm'
    );
  });

  it('should initialize metrics. active', () => {
    expect(getClassNames(defaultMetrics, 'MAV', 'X')).toEqual(
      'btn btn-primary btn-sm active'
    );
  });

  it('should initialize metrics. Base Metrics', () => {
    expect(getClassNames(defaultMetrics, 'MAV', 'H', 'Base Metrics')).toEqual(
      'btn btn-primary btn-sm'
    );
  });

  it('should initialize metrics. Supplemental Metrics', () => {
    expect(
      getClassNames(defaultMetrics, 'MAV', 'H', 'Supplemental Metrics')
    ).toEqual('btn btn-success btn-sm');
  });

  it('should initialize metrics. Environmental (Modified Base Metrics)', () => {
    expect(
      getClassNames(
        defaultMetrics,
        'MAV',
        'H',
        'Environmental (Modified Base Metrics)'
      )
    ).toEqual('btn btn-danger btn-sm');
  });

  it('should initialize metrics. Environmental (Security Requirements)', () => {
    expect(
      getClassNames(
        defaultMetrics,
        'MAV',
        'H',
        'Environmental (Security Requirements)'
      )
    ).toEqual('btn btn-warning btn-sm');
  });

  it('should initialize metrics. Threat Metrics', () => {
    expect(getClassNames(defaultMetrics, 'MAV', 'H', 'Threat Metrics')).toEqual(
      'btn btn-info btn-sm'
    );
  });

  it('should initialize metrics. wrong type', () => {
    expect(getClassNames(defaultMetrics, 'MAV', 'H', 'Hello World')).toEqual(
      'btn btn-primary btn-sm'
    );
  });
});
