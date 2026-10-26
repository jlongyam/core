import { textStyle } from "./code.mjs";

let style = {};
for(let i in textStyle) {
  style[i] = txt=> `\x1b[${textStyle[i]}m${txt}\x1b[0m`;
}

export default style;