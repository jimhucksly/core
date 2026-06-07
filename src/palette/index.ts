import { PaletteScheme, IPaletteSchemeUnit, IShades } from "@/types/palette";

interface IPivot {
  h: number;
  s: number;
  l: number;
  a: number;
}



const defaultScheme: PaletteScheme = [
  {
    name: 'primary',
    lighten: {
      steps: { l: [67, 74, 82, 89, 94, 97] },
      prefix: 'l',
    },
    darken: {
      steps: { l: [52, 44, 36, 27, 19, 10] },
      prefix: 'd',
    },
    pivot: { h: 218, s: 100, l: 60, a: 100 },
  },
  {
    name: 'secondary',
    lighten: {
      steps: { l: [71, 77, 83, 89, 93, 96] },
      prefix: 'l',
    },
    darken: {
      steps: { l: [56, 47, 38, 29, 18, 10] },
      prefix: 'd',
    },
    pivot: { h: 40, s: 100, l: 65, a: 100 },
  },
  {
    name: 'success',
    lighten: {
      steps: {
        l: [51, 58, 67, 74, 82, 89, 95],
        s: [60, 64, 69, 68, 67, 79, 100]
      },
      prefix: 'l',
    },
    darken: {
      steps: {
        l: [38, 32, 25, 20, 10],
        s: [81, 82, 81, 82, 82],
      },
      prefix: 'd',
    },
    pivot: { h: 130, s: 76, l: 44, a: 100 },
  },
  {
    name: 'error',
    lighten: {
      steps: { l: [60, 67, 74, 82, 89, 94, 97] },
      prefix: 'l',
    },
    darken: {
      steps: { l: [44, 36, 27, 19, 10] },
      prefix: 'd',
    },
    pivot: { h: 354, s: 83, l: 52, a: 100 },
  },
  {
    name: 'warning',
    lighten: {
      steps: { l: [67, 74, 81, 89, 94, 97] },
      prefix: 'l',
    },
    darken: {
      steps: { l: [52, 44, 36, 27, 19, 10] },
      prefix: 'd',
    },
    pivot: { h: 24, s: 100, l: 60, a: 100 },
  },
  {
    name: 'grey',
    lighten: {
      steps: { l: [71, 77, 83, 89, 93, 96] },
      prefix: 'l',
    },
    darken: {
      steps: { l: [56, 47, 38, 29, 20, 10] },
      prefix: 'd',
    },
    pivot: { h: 220, s: 5, l: 65, a: 100 },
  },
  {
    name: 'shade',
    lighten: {
      steps: { a: [90, 80, 70, 60, 50, 40, 30, 20, 10, 7, 5, 3] },
      prefix: (steps, index) => {
        return ('0' + String(steps['a'][index])).slice(-2);
      },
    },
    pivot: { h: 219, s: 83, l: 14, a: 100 },
  },
  {
    name: 'dark',
    pivot: { h: 218, s: 83, l: 14, a: 100 },
  }
]

function generatePalette(scheme?: PaletteScheme): string {
  if (!scheme) {
    scheme = defaultScheme;
  }
  let root = ':root {%palette%}';
  for (const color of scheme) {
    const palette = generateColors(color);
    root = root.replace(/%palette%/g, palette + '%palette%');
  }
  root = root.replace(/%palette%/g, '\n');
  return root;
}

function generateColors(color: IPaletteSchemeUnit): string {
  let result = '';
  const addBase = () => {
    const css = `  --${color.name}: ${getHSLA(color.pivot)};`;
    result = result + '\n' + css;
  }
  ['lighten', 'darken'].forEach((a: keyof IPaletteSchemeUnit, index : number) => {
    if (!color[a]) {
      return;
    }
    const pivot = { ...color.pivot };
    const data = color[a] as IShades;
    const steps = data.steps;
    const keys = Object.keys(steps);
    const count = steps[keys[0] as keyof IPivot].length;
    Array(count).fill(null).forEach((_, i) => {
      for (const key of keys) {
        pivot[key as keyof IPivot] = steps[key as keyof IPivot][i];
      }
      let prefix = '';
      if (data.prefix instanceof Function) {
        prefix = data.prefix(steps, i);
      } else {
        prefix = data.prefix ? `${data.prefix}-${i + 1}` : '';
      }
      const css = `  --${color.name}-${prefix}: ${getHSLA(pivot)};`;
      if (index === 0) {
        result = '\n' + css + result;
      } else {
        result = result + '\n' + css;
      }
    });
    if (index === 0) {
      addBase();
    }
  });
  if (!result) {
    addBase();
  }
  return result;
}

function getHSLA(pivot: IPivot) {
  const hsla = Object.keys(pivot).map((k: keyof IPivot, i: number) => String(pivot[k]) + (i > 0 ? '%' : ''));
  return `hsla(${hsla.join(', ')})`;
}

export {
  generatePalette
}
