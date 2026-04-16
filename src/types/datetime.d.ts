export type DatetimeValueRaw =
  | Date
  | Array<number>
  | string
  | number
  | { year: number; month: number; date: number; hours?: number; minutes?: number; seconds?: number; ms?: number };

export type ViewMode = 'month' | 'months' | 'year';
