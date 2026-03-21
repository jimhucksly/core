import { isDefined } from '@/utils/isDefined';

describe('isDefined', () => {
  it('Корректно вычисляет isDefined', () => {
    expect(isDefined(1)).toBeTruthy();
    expect(isDefined(0)).toBeTruthy();
    expect(isDefined('')).toBeTruthy();
    expect(isDefined(true)).toBeTruthy();
    expect(isDefined(false)).toBeTruthy();
    expect(isDefined([])).toBeTruthy();
    expect(isDefined({})).toBeTruthy();
    expect(isDefined(NaN)).toBeFalsy();
    expect(isDefined(null)).toBeFalsy();
    expect(isDefined(undefined)).toBeFalsy();
    const func = function () { return true; }
    expect(isDefined(func)).toBeTruthy();
  })
})