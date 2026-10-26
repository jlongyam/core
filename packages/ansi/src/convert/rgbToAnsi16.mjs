import ansi256ToAnsi16 from "./ansi256ToAnsi16.mjs";
import rgbToAnsi256 from './rgbToAnsi256.mjs';

function rgbToAnsi16(r,g,b) {
  const rgb_ansi_256 = rgbToAnsi256(r,g,b);
  return ansi256ToAnsi16(rgb_ansi_256);
}

export default rgbToAnsi16;