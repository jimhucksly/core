import { DatetimeValueRaw } from '@/types/datetime';

class Datetime {
  isDate(value: string | Date): boolean {
    if (value instanceof Date) {
      return !isNaN(value.getTime());
    }
    return !isNaN(new Date(value).getTime());
  }
  isISO(value: string): boolean {
    return /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)/.test(value);
  }
  /**
   * Конвертация входящиего значения в объект даты. Возможные типы входящего значения:
   * a instanceof Date:           вернуть без преобразований
   * typeof a === 'array':        интерпретируем как [year,month,day], month - 0-11
   * typeof a === 'number:        интерпретируем как милисекунды от 1 Jan 1970 (timestamp)
   * typeof a === 'string':       любой валидный формат даты в строковом представлении
   * typeof a === 'object':       интерпретируем как объект
   *                                {
   *                                    year: number;
   *                                    month: number;
   *                                    date: number;
   *                                    hours?: number;
   *                                    minutes?: number;
   *                                    seconds?: number;
   *                                    ms?: number
   *                                }
   */
  toDate(d: DatetimeValueRaw, locale: string = 'ru'): Date {
    if (d instanceof Date && this.isDate(d)) {
      return d;
    }
    if (Array.isArray(d)) {
      const date = new Date(d[0], d[1], d[2]);
      return this.isDate(date) ? date : null;
    }
    if (typeof d === 'number') {
      const date = new Date(d);
      return this.isDate(date) ? date : null;
    }
    if (typeof d === 'string') {
      if (this.isISO(d)) {
        return new Date(d);
      }
      const iso = this.localToISO(d, locale);
      const date = new Date(iso);
      return this.isDate(date) ? date : null;
    }
    if (typeof d === 'object' && 'year' in d && 'month' in d && 'date' in d) {
      const date = new Date(d.year, d.month, d.date, d.hours, d.minutes, d.seconds, d.ms);
      return this.isDate(date) ? date : null;
    }
    return d;
  }

  localToISO(value: string, locale: string = 'ru'): string {
    const { d, m, y, hh, mm, ss } = this.parseDate(value, locale);
    if (d && m && y) {
      let v = `${y}-${m}-${d}`;
      if (hh && mm) {
        v = `${v}T${hh}:${mm}:${ss || '00'}`;
      } else {
        v = `${v}T00:00:00`;
      }
      return v + '.000Z';
    }
    return '';
  }

  dateToLocal(value: string | Date, locale: string = 'ru'): string {
    const d = this.toDate(value, locale);
    return this.formatDate(d, locale === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
  }

  /**
   * Сравнение двух дат (strict = true - с учетом времени)
   * -1 : if a < b
   *  0 : if a = b
   *  1 : if a > b
   *  NaN - если a или b не являются объектом даты
   */
  compare(a: DatetimeValueRaw, b: DatetimeValueRaw, strict: boolean = false): number {
    if (!a || !b) {
      return NaN;
    }
    a = this.toDate(a);
    b = this.toDate(b);
    if (!a || !b) {
      return NaN;
    }
    if (strict) {
      const a1: number = a ? this.toDate(a).valueOf() : 0;
      const b1: number = b ? this.toDate(b).valueOf() : 0;
      return isFinite(a1) && isFinite(b1) ? Number(a1 > b1) - Number(a1 < b1) : NaN;
    }
    let result = 0;
    if (a.getDate() !== b.getDate()) {
      result = a.getDate() > b.getDate() ? 1 : -1;
    }
    if (a.getMonth() !== b.getMonth()) {
      result = a.getMonth() > b.getMonth() ? 1 : -1;
    }
    if (a.getFullYear() !== b.getFullYear()) {
      result = a.getFullYear() > b.getFullYear() ? 1 : -1;
    }
    return result;
  }

  strictCompare(a: DatetimeValueRaw, b: DatetimeValueRaw): number {
    return this.compare(a, b, true);
  }

  /**
   * Преобразует дату к формату yyyy-MM-ddThh:mm:ss+hh:mm (например, 2020-11-24T12:47:45+03:00)
   */
  toServerString(dt: Date): string {
    if (!dt) {
      return null;
    }
    const tzo = -dt.getTimezoneOffset();
    const dif = tzo >= 0 ? '+' : '-';
    const pad = function (num: number) {
      const norm = Math.abs(Math.floor(num));
      return (norm < 10 ? '0' : '') + norm;
    };
    return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(
      dt.getMinutes()
    )}:${pad(dt.getSeconds())}${dif}${pad(tzo / 60)}:${pad(tzo % 60)}`;
  }

  /**
   * Преобразует дату к формату по заданному шаблону
   * например, 'DD.MM.YYYY, hh:mm:ss'
   */
  formatDate(date: Date, format: string): string {
    const d = String(date.getDate());
    const m = String(date.getMonth() + 1);
    const y = String(date.getFullYear());
    const hh = String(date.getHours());
    const mm = String(date.getMinutes());
    const ss = String(date.getSeconds());

    return format
      .replace(/DD/g, this.leaderZero(d))
      .replace(/MM/g, this.leaderZero(m))
      .replace(/YYYY/g, y)
      .replace(/hh/g, this.leaderZero(hh))
      .replace(/mm/g, this.leaderZero(mm))
      .replace(/ss/g, this.leaderZero(ss));
  }

  private leaderZero(v: string | number) {
    if (typeof v === 'number') {
      v = String(v);
    }
    return v.length === 1 ? '0' + v : v;
  }

  /**
   * locale = ru: "15.10.2025" converting to '2025-10-15T00:00:00'
   * locale = en: "10/15/2025" converting to '2025-10-15T00:00:00'
   */
  private parseDate(
    value: string,
    locale: string = 'ru'
  ): {
    d: string;
    m: string;
    y: string;
    hh: string;
    mm: string;
    ss: string;
  } {
    let parsed: RegExpExecArray = null;
    if (locale === 'ru') {
      parsed = /^(\d\d?).(\d\d?).(\d\d\d?\d?)(, )?(\d\d)?:?(\d\d)?$/.exec(value);
    }
    if (locale === 'en') {
      parsed = /^(\d\d?)\/(\d\d?)\/(\d\d\d?\d?)$/.exec(value);
    }
    if (!parsed) {
      return null;
    }

    const result: {
      d: string;
      m: string;
      y: string;
      hh: string;
      mm: string;
      ss: string;
    } = {
      d: null,
      m: null,
      y: null,
      hh: null,
      mm: null,
      ss: null,
    };

    if (parsed[1]) {
      result[locale === 'ru' ? 'd' : 'm'] = this.leaderZero(parsed[1]);
    }
    if (parsed[2]) {
      result[locale === 'ru' ? 'm' : 'd'] = this.leaderZero(parsed[2]);
    }
    if (parsed[3]) {
      result['y'] = parsed[3];
    }
    if (parsed[5]) {
      result['hh'] = this.leaderZero(parsed[5]);
    }
    if (parsed[6]) {
      result['mm'] = this.leaderZero(parsed[6]);
    }
    if (parsed[7]) {
      result['ss'] = this.leaderZero(parsed[7]);
    }
    return result;
  }
}

const datetime = new Datetime();
export { datetime };
