export type TExpires = 'day' | 'month' | 'year'

export interface ICookie {
  set: (key: string, value: string, expires?: TExpires) => void
  get: (key: string) => string
  delete: (key: string) => void
}
