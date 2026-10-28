import { color, html } from "@jlbyte/ansi";

let sentence = [
  `Color ${color.fg.red('red')} and ${color.bg.yellow('Yellow')} background`,
  `This is RGB ${color.fgRGB([238, 75, 43], 'Bright Red')} actually`
];

console.log(html(sentence[0]));
console.log(html(sentence[1]))