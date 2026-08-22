const assert = require('assert');
const LCHPicker = require('./core');

const res = LCHPicker.convert('#3b82f6');
assert.strictEqual(res.rgb, 'rgb(59, 130, 246)');
assert.strictEqual(res.oklch.startsWith('oklch('), true);

console.log('ok, all LCHPicker assertions passed');
