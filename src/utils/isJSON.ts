/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const isJSON = (value: any): boolean => {
  let json: Record<string, unknown>;
  if (typeof value === 'string') {
    try {
      json = JSON.parse(value);
      return true;
    } catch (e) {
      //
    }
  } else {
    try {
      json = JSON.parse(JSON.stringify(value));
      if (json && typeof json === 'object' && json !== null) {
        return true;
      }
    } catch (e) {
      //
    }
  }
  return false;
};
