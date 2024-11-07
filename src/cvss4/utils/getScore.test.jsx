import { defaultMetrics } from '../resources/fakeData';
import { getScore } from './getScore';

describe('getScore', () => {
  it('should handle score. undefined', () => {
    expect(getScore(undefined)).toEqual(0);
  });

  it('should handle score. default', () => {
    expect(getScore(defaultMetrics)).toEqual(0);
  });

  it('should handle score. no impact on system', () => {
    expect(
      getScore({
        ...defaultMetrics,
        VC: 'H',
      })
    ).toEqual(8.7);
  });

  it('should handle score. EQ3=0 & EQ6=0', () => {
    expect(
      getScore({
        ...defaultMetrics,
        CR: 'H',
        VC: 'H',
      })
    ).toEqual(8.7);
  });

  it('should handle score. EQ3=1 & EQ6=0', () => {
    expect(
      getScore({
        ...defaultMetrics,
        VC: 'H',
        VI: 'H',
      })
    ).toEqual(9.3);
  });

  it('should handle score. EQ3=1 & EQ6=0. case 2', () => {
    expect(
      getScore({
        ...defaultMetrics,
        AC: 'H',
        AR: 'L',
        VC: 'H',
        VI: 'H',
      })
    ).toEqual(9);
  });

  it('should handle score. EQ3=1 & EQ6=1', () => {
    expect(
      getScore({
        ...defaultMetrics,
        AC: 'H',
        AR: 'L',
        AV: 'P',
        E: 'U',
        IR: 'L',
        MAV: 'P',
        VI: 'H',
      })
    ).toEqual(0.1);
  });

  it('should handle score. EQ3=2 & EQ6=1', () => {
    expect(
      getScore({
        ...defaultMetrics,
        AC: 'H',
        AR: 'L',
        AV: 'P',
        E: 'U',
        IR: 'L',
        MAV: 'P',
        SA: 'L',
      })
    ).toEqual(0.1);
  });

  it('should handle score. EQ3=2 & EQ6=1', () => {
    expect(
      getScore({
        ...defaultMetrics,
        AC: 'H',
        AR: 'L',
        AV: 'P',
        E: 'U',
        IR: 'L',
        MAV: 'P',
        SA: 'L',
      })
    ).toEqual(0.1);
  });

  it('should handle score. EQ3=0 & EQ6=1', () => {
    expect(
      getScore({
        ...defaultMetrics,
        AR: 'L',
        CR: 'L',
        IR: 'L',
        VC: 'H',
        VI: 'H',
      })
    ).toEqual(8.8);
  });

  it('should handle score. unreported exploit maturity', () => {
    expect(
      getScore({
        ...defaultMetrics,
        AC: 'H',
        AR: 'L',
        AV: 'P',
        E: 'U',
        IR: 'L',
        MAV: 'P',
        SA: 'H',
      })
    ).toEqual(0.2);
  });

  it('should handle score. use case', () => {
    expect(
      getScore({
        ...defaultMetrics,
        AV: 'L',
        AC: 'H',
        AT: 'N',
        PR: 'L',
        UI: 'N',
        VC: 'L',
        VI: 'H',
        VA: 'L',
        SC: 'N',
        SI: 'N',
        SA: 'N',
        E: 'U',
      })
    ).toEqual(1.9);
  });
});
