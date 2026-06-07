class Strings {
  constructor() {
    //
  }

  public upperFirst(s: string) {
    s = s.toString();
    if (!s.length) {
      return '';
    }
    const upper = s.charAt(0).toUpperCase();
    return upper + (s.length > 1 ? s.slice((s.length - 1) * -1) : '');
  }

  public lowerFirst(s: string) {
    s = s.toString();
    if (!s.length) {
      return '';
    }
    return s.charAt(0).toLowerCase() + s.slice((s.length - 1) * -1);
  };

  public isNumber(value: unknown): boolean {
    return !isNaN(value as number);
  }
}

const strings = new Strings();

export {
  strings
}