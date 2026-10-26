import { fg, bg } from '@jlbyte/ansi/code';
import color from '@jlbyte/ansi/color';

console.group('color.fg && color.fgBright')
for(let i in fg) {
  console.log(`color.fg.${i} ${color.fg[i]('Text content')} - color.fgBright.${i} ${color.fgBright[i]('Text content')}`);
}
console.groupEnd();

console.group('color.bg && color.bgBright')
for(let i in bg) {
  console.log(`color.bg.${i} ${color.bg[i]('Text content')} - color.bgBright.${i} ${color.bgBright[i]('Text content')}`)
}
console.groupEnd();

