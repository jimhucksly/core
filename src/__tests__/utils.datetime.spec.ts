import { datetime } from '@/utils/datetime'

describe('Datetime', () => {
  it('ok', () => {
    expect(datetime.isDate('2025-10-15')).toBeTruthy();
    expect(datetime.isDate('abc')).toBeFalsy();
    expect(datetime.isISO('2025-10-15T00:00:00')).toBeTruthy();
    expect(datetime.isISO('2025-10-15T00:00:00.000Z')).toBeTruthy();
    expect(datetime.localToISO('15.10.2025', 'ru')).toEqual('2025-10-15T00:00:00.000Z');
    expect(datetime.localToISO('10/15/2025', 'en')).toEqual('2025-10-15T00:00:00.000Z');
    expect(datetime.dateToLocal('2025-10-15T00:00:00', 'ru')).toEqual('15.10.2025');
    expect(datetime.dateToLocal('2025-10-15T00:00:00', 'en')).toEqual('10/15/2025');
    let a = '15.10.2025';
    let b = '15.10.2025';
    expect(datetime.compare(datetime.localToISO(a), b)).toEqual(0);
    a = '15.10.2025, 13:25';
    b = '15.10.2025, 13:26';
    expect(datetime.strictCompare(datetime.localToISO(a), datetime.localToISO(b))).toEqual(-1);
    expect(datetime.strictCompare(datetime.localToISO(b), datetime.localToISO(a))).toEqual(1);
    expect(datetime.compare(datetime.localToISO(a), datetime.localToISO(b))).toEqual(0);
    const d = new Date(2025, 9, 15, 14, 45, 53);
    expect(datetime.toServerString(d)).toEqual('2025-10-15T14:45:53+03:00');
  });
});