import { strings } from '@/utils/string';

describe('Strings', () => {
  it('upperFirst', () => {
    expect(strings.upperFirst('lorem')).toEqual('Lorem');
  });

  it('lowerFirst', () => {
    expect(strings.lowerFirst('LoremIpsum')).toEqual('loremIpsum');
  });
});
