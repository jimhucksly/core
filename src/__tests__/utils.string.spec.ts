import { strings } from '@/utils/string';

describe('Strings', () => {
  it('upperFirst', () => {
    expect(strings.upperFirst('lorem')).toEqual('Lorem');
    expect(strings.upperFirst('b')).toEqual('B');
  });

  it('lowerFirst', () => {
    expect(strings.lowerFirst('LoremIpsum')).toEqual('loremIpsum');
  });

  it('isNumber', () => {
    expect(strings.isNumber(0)).toBeTruthy();
    expect(strings.isNumber('0')).toBeTruthy();
    expect(strings.isNumber('')).toBeTruthy();
    expect(strings.isNumber(null)).toBeTruthy();
    expect(strings.isNumber('a')).toBeFalsy();
  });
});
