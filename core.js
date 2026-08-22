;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LCHPicker = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function hexToRgb(hex) {
    const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(hex || '').trim());
    if (!match) throw new Error('Use a 3- or 6-digit hexadecimal color.');
    let value = match[1];
    if (value.length === 3) value = value.replace(/./g, function (char) { return char + char; });
    return { r: parseInt(value.slice(0, 2), 16), g: parseInt(value.slice(2, 4), 16), b: parseInt(value.slice(4, 6), 16), hex: '#' + value.toLowerCase() };
  }

  function linear(value) {
    value /= 255;
    return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  }

  function rgbToOklch(rgb) {
    const r = linear(rgb.r), g = linear(rgb.g), b = linear(rgb.b);
    let l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    let m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    let s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    l = Math.cbrt(l); m = Math.cbrt(m); s = Math.cbrt(s);
    const lightness = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
    const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
    const bb = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
    const chroma = Math.sqrt(a * a + bb * bb);
    let hue = Math.atan2(bb, a) * 180 / Math.PI;
    if (hue < 0) hue += 360;
    if (chroma < 0.000004) hue = 0;
    return { l: lightness, c: chroma, h: hue };
  }

  function rgbToHsl(rgb) {
    const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
    let hue = 0;
    if (delta) {
      if (max === r) hue = ((g - b) / delta) % 6;
      else if (max === g) hue = (b - r) / delta + 2;
      else hue = (r - g) / delta + 4;
      hue *= 60; if (hue < 0) hue += 360;
    }
    const lightness = (max + min) / 2;
    const saturation = delta ? delta / (1 - Math.abs(2 * lightness - 1)) : 0;
    return { h: hue, s: saturation, l: lightness };
  }

  function convert(hex) {
    const rgb = hexToRgb(hex), ok = rgbToOklch(rgb), hsl = rgbToHsl(rgb);
    return {
      hex: rgb.hex,
      rgb: 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')',
      hsl: 'hsl(' + hsl.h.toFixed(1) + ' ' + (hsl.s * 100).toFixed(1) + '% ' + (hsl.l * 100).toFixed(1) + '%)',
      oklch: 'oklch(' + ok.l.toFixed(4) + ' ' + ok.c.toFixed(4) + ' ' + ok.h.toFixed(2) + ')',
      components: { lightness: ok.l, chroma: ok.c, hue: ok.h }
    };
  }

  return { convert: convert, hexToRgb: hexToRgb, rgbToOklch: rgbToOklch };
});
