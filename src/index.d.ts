import { IEventBus } from './types/eventBus';
import { ICookie } from './types/cookies';

declare const eventBus: IEventBus;
declare const cookie: ICookie;
declare function uniqueID(len: number, format: string): string | number;
declare function delay(timeout: number): Promise<void>;
declare function isDefined(value: unknown): boolean;
declare const base64: {
  encode(value: string): string;
  decode(value: string): string;
  isValid(value: string): boolean;
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

declare function generatePalette(colors?: Array<IColor>): string;
