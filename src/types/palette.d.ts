export interface IPivot {
  h: number;
  s: number;
  l: number;
  a: number;
}

export interface IPaletteSchemeUnit {
  name: string;
  lighten?: IShades,
  darken?: IShades,
  pivot: IPivot,
}

export type Steps = {
  [K in keyof IPivot]?: Array<number>;
};

export interface IShades {
  steps: Steps;
  prefix: string | ((steps: Steps, index: number) => string);
}

export type PaletteScheme = Array<IPaletteSchemeUnit>;
