class Objects {
  constructor() {
    //
  }

  isEmpty(o: Record<string, unknown>): boolean {
    if (typeof o !== 'object') {
      return true;
    }
    if (!o) {
      return true;
    }
    const keys = Object.keys(o);
    if (!Array.isArray(keys)) {
      return true;
    }
    return keys.length === 0;
  }

  deepValueGetter(obj: Record<string, unknown>, path: string): unknown {
    if (obj === null) {
      return '';
    }
    if (!obj || !path) {
      return obj;
    }
    const value = obj[path];
    // eslint-disable-next-line no-undefined
    if (value !== undefined) {
      return value;
    }
    let current = obj;
    const split = path.split('.');
    if (split.length) {
      for (const key of split) {
        current = current[key] as Record<string, unknown>;
        // if found undefined, return empty string
        // eslint-disable-next-line no-undefined
        if (current === undefined || current === null) {
          return '';
        }
      }
    }
    return current;
  }
}

const objects = new Objects();

export {
  objects
}