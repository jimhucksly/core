import { IEventBus } from './types/eventBus';
import { ICookie } from './types/cookie';

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
