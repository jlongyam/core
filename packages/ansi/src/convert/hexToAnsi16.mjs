import hexToRgb from './hexToRgb.mjs';
import rgbToAnsi16 from './rgbToAnsi16.mjs';

function hexToAnsi16(hex) {
  var o = hexToRgb(hex);
  return rgbToAnsi16(o.r, o.g, o.b);
}

export default hexToAnsi16;