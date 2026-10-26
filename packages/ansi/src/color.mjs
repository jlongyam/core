import { fg, fgBright, bg, bgBright } from "./code.mjs";

const color = {
  fg: {},
  fgBright: {},
  bg: {},
  bgBright: {}
};

for( let i in fg ) {
  color.fg[i] = txt => `\x1b[${fg[i]}m${txt}\x1b[0m`;
  color.fgBright[i] = txt => `\x1b[${fgBright[i]}m${txt}\x1b[0m`;
  color.bg[i] = txt => `\x1b[${bg[i]}m${txt}\x1b[0m`;
  color.bgBright[i] = txt => `\x1b[${bgBright[i]}m${txt}\x1b[0m`;
}

color.fg256 = function(n, text) {
  return `\x1b[38;5;${n}m${text}\x1b[0m`;
}
color.bg256 = function(n, text) {
  return `\x1b[48;5;${n}m${text}\x1b[0m`;
}
color.fgRGB = function(arr, txt) {
  var r = arr[0], g = arr[1], b = arr[2];
  return `\x1b[38;2;${r};${g};${b}m${txt}\x1b[0m`;
}
color.bgRGB = function(arr, txt) {
  var r = arr[0], g = arr[1], b = arr[2];
  return `\x1b[48;2;${r};${g};${b}m${txt}\x1b[0m`;
}

export default color;