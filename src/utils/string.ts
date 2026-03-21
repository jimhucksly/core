class Strings {
  constructor() {
    //
  }

  public upperFirst(s: string) {
    s = s.toString();
    if (!s.length) {
      return '';
    }
    return s.charAt(0).toUpperCase() + s.slice((s.length - 1) * -1);
  }

  public lowerFirst(s: string) {
    s = s.toString();
    if (!s.length) {
      return '';
    }
    return s.charAt(0).toLowerCase() + s.slice((s.length - 1) * -1);
  };
}

const strings = new Strings();

export {
  strings
}