import { objects } from '@/utils/object';

describe('Objects', () => {
  it('isEmpty', () => {
    expect(objects.isEmpty(null)).toBeTruthy();
    expect(objects.isEmpty({})).toBeTruthy();
    expect(objects.isEmpty({ a: 1 })).toBeFalsy();
  });

  it('deepValueGetter', () => {
    const value = {
      key1: {
        key2: {
          key3: 1,
        },
      },
    };
    expect(objects.deepValueGetter(value, 'key1.key2.key3')).toEqual(1);
    expect(objects.deepValueGetter(value, 'key1.key4')).toEqual('');
  });
});
