import color from '@jlbyte/ansi/color';
import * as code from '@jlbyte/ansi/code';
import ansi16ToHex from "../../src/convert/ansi16toHex.mjs";

console.log(ansi16ToHex(`Hello ${color.fg.red('ANSI')} world`))
