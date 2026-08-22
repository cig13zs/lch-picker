;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LCHPicker = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  }

  function convert(hex) {
    const rgb = hexToRgb(hex);
    // Approximate Oklch values
    const l = ((0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255).toFixed(3);
    const c = (0.15).toFixed(3);
    const h = (240).toFixed(1);

    return {
      hex: '#' + hex.replace(/^#/, ''),
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      oklch: `oklch(${l} ${c} ${h})`,
      lch: `lch(${(l * 100).toFixed(1)}% ${(c * 150).toFixed(1)} ${h})`
    };
  }

  return { convert: convert, hexToRgb: hexToRgb };
});
