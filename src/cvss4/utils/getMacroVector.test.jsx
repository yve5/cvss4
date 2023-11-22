import { defaultMetrics } from '../resources/fakeData';
import { getMacroVector } from './getMacroVector';

describe('getMacroVector', () => {
  it('should handle macro vector. undefined', () => {
    expect(getMacroVector(undefined)).toEqual('212201');
  });

  it('should handle macro vector. default', () => {
    expect(getMacroVector(defaultMetrics)).toEqual('002201');
  });

  it('should handle macro vector. EQ1=1', () => {
    expect(
      getMacroVector({
        ...defaultMetrics,
        AV: 'A',
      })
    ).toEqual('102201');

    expect(
      getMacroVector({
        ...defaultMetrics,
        PR: 'L',
      })
    ).toEqual('102201');

    expect(
      getMacroVector({
        ...defaultMetrics,
        UI: 'P',
      })
    ).toEqual('102201');
  });

  it('should handle macro vector. EQ3=0', () => {
    expect(
      getMacroVector({
        ...defaultMetrics,
        VC: 'H',
        VI: 'H',
      })
    ).toEqual('000200');
  });

  it('should handle macro vector. EQ3=1', () => {
    expect(
      getMacroVector({
        ...defaultMetrics,
        VA: 'H',
      })
    ).toEqual('001200');
  });

  it('should handle macro vector. EQ4=0', () => {
    expect(
      getMacroVector({
        ...defaultMetrics,
        MSI: 'S',
      })
    ).toEqual('002001');
  });

  it('should handle macro vector. EQ4=1', () => {
    expect(
      getMacroVector({
        ...defaultMetrics,
        SC: 'H',
      })
    ).toEqual('002101');
  });

  it('should handle macro vector. EQ5=1', () => {
    expect(
      getMacroVector({
        ...defaultMetrics,
        E: 'P',
      })
    ).toEqual('002211');
  });

  it('should handle macro vector. EQ5=2', () => {
    expect(
      getMacroVector({
        ...defaultMetrics,
        E: 'U',
      })
    ).toEqual('002221');
  });

  it('should handle macro vector. EQ6=0', () => {
    expect(
      getMacroVector({
        ...defaultMetrics,
        CR: 'H',
        VC: 'H',
      })
    ).toEqual('001200');
  });

  it('should handle macro vector. EQ3=1 & EQ6=0', () => {
    expect(
      getMacroVector({
        ...defaultMetrics,
        CR: 'H',
        VC: 'H',
      })
    ).toEqual('001200');
  });

  it('should handle macro vector. EQ3=0 & EQ6=0', () => {
    expect(
      getMacroVector({
        ...defaultMetrics,
        VC: 'H',
        VI: 'H',
      })
    ).toEqual('000200');
  });

  it('should handle macro vector. EQ2', () => {
    expect(
      getMacroVector({
        ...defaultMetrics,
        AC: 'L',
        AT: 'N',
      })
    ).toEqual('002201');

    expect(
      getMacroVector({
        ...defaultMetrics,
        AC: 'L',
        AT: 'P',
      })
    ).toEqual('012201');

    expect(
      getMacroVector({
        ...defaultMetrics,
        AC: 'H',
        AT: 'N',
      })
    ).toEqual('012201');

    expect(
      getMacroVector({
        ...defaultMetrics,
        AC: 'H',
        AT: 'P',
      })
    ).toEqual('012201');
  });
});
