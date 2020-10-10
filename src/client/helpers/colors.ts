type RgbColor = {
  r: number;
  g: number;
  b: number;
};

function hexToRgb(hex: string): RgbColor {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex({ r, g, b }: RgbColor) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function intermediateColor(
  color1: string,
  color2: string,
  percent: number
) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const result = {
    r: Math.round(rgb1.r + (rgb2.r - rgb1.r) * percent),
    g: Math.round(rgb1.g + (rgb2.g - rgb1.g) * percent),
    b: Math.round(rgb1.b + (rgb2.b - rgb1.b) * percent),
  };

  return rgbToHex(result);
}
