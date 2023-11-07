import { cvssMacroVectorDetails, cvssMacroVectorValues } from './cvssDetails';

describe('cvssDetails', () => {
  it('should stock cvssMacroVectorDetails', () => {
    expect(Object.keys(cvssMacroVectorDetails).length).toEqual(6);
  });

  it('should stock cvssMacroVectorValues', () => {
    expect(Object.keys(cvssMacroVectorValues).length).toEqual(4);
  });
});
