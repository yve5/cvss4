import { roundScore } from './roundScore';

describe('roundScore', () => {
  it('should round score. undefined', () => {
    expect(roundScore(undefined)).toEqual(0);
  });

  it('should round score. default', () => {
    expect(roundScore(9.2345345)).toEqual(9.2);
  });

  it('should round score. below 0', () => {
    expect(roundScore(-0.2345345)).toEqual(0);
  });

  it('should round score. above 10', () => {
    expect(roundScore(10.2345345)).toEqual(10);
  });
});
