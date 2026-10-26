import color from '@jlbyte/ansi/color';
import find from '@jlbyte/ansi/find';
import ansi16ToHex from "../src/convert/ansi16toHex.mjs";
//import { color, find } from '../../dist/ansi.mjs';

//let words = `Hi ${color.fg.red('there')}, how are ${color.fg.green('you')} ?`;

// console.log(words);
// console.log(find(words));

var code = `Color ${color.fg.red('red')}`;

const arr = find(code);
for(let i in arr) {
  let obj = arr[i];
  console.log(arr[i])
}
// console.log(arr);