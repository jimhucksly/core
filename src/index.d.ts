import { IEventBus } from './types/eventBus';
import { ICookie } from './types/cookie';
import { DatetimeValueRaw } from './types/datetime';

export declare const eventBus: IEventBus;
export declare const cookie: ICookie;
export declare function uniqueID(len: number, format?: string): string | number;
export declare function delay(timeout: number): Promise<void>;
export declare function isDefined(value: unknown): boolean;
export declare function isJSON(value: unknown): boolean;
export declare const base64: {
  encode(value: string): string;
  decode(value: string): string;
  isValid(value: string): boolean;
}
export declare const strings: {
  upperFirst: (s: string) => string;
  lowerFirst: (s: string) => string;
}
export declare const objects: {
  isEmpty: (o: Record<string, unknown>) => boolean;
  deepValueGetter: (o: Record<string, unknown>, key: string) => unknown;
}
export declare const files: {
  getExtension: (filename: string) => string;
  getFileName: (filename: string) => string;
  formatSize: (bytes: number | string, decimals: number) => string;
}
export declare const datetime: {
  isDate: (value: string | Date) => boolean;
  isISO: (value: string) => boolean;
  toDate: (d: DatetimeValueRaw, locale: string) => Date;
  localToISO: (value: string, locale: string) => string;
  dateToLocal: (value: string | Date, locale: string) => string;
  compare: (a: DatetimeValueRaw, b: DatetimeValueRaw, strict?: boolean) => number;
  strictCompare: (a: DatetimeValueRaw, b: DatetimeValueRaw) => number;
  toServerString: (dt: Date) => string;
  formatDate: (date: Date, format: string) => string;
}

interface IPivot {
  h: number;
  s: number;
  l: number;
  a: number;
}

type Steps = Record<string, Array<number>>;

interface IShades {
  steps: Steps;
  prefix: string | ((steps: Steps, index: number) => string);
}

export interface IColor {
  name: string;
  darken?: IShades,
  lighten?: IShades,
  pivot: IPivot,
}

export declare function generatePalette(colors?: Array<IColor>): string;
