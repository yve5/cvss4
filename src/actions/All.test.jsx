import { changeValue } from './All';

describe('Actions', () => {
  it('should handle CVSS4_CHANGE_VALUE', () => {
    expect(changeValue('AV', 'A')).toEqual({
      type: 'CVSS4_CHANGE_VALUE',
      metric: 'AV',
      value: 'A',
    });
  });
});
