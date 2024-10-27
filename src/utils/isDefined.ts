export function isDefined(value: unknown): boolean {
  /* eslint-disable no-undefined */
  const isNaNValue = typeof value === 'number' && isNaN(value)
  return value !== null && value !== undefined && !isNaNValue
}
