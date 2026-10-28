import { code, color} from '@jlbyte/ansi';

// ansi16
console.group('color.fg && color.fgBright')
for(let i in code.fg) {
  console.log(`color.fg.${i} ${color.fg[i]('Text content')} - color.fgBright.${i} ${color.fgBright[i]('Text content')}`);
}
console.groupEnd();

console.group('color.bg && color.bgBright')
for(let i in code.bg) {
  console.log(`color.bg.${i} ${color.bg[i]('Text content')} - color.bgBright.${i} ${color.bgBright[i]('Text content')}`)
}
console.groupEnd();

// ansi256
console.group('color.fg256 && color.bg256 - Standard && Intense');
for(let i = 0; i <= 7; i++) {
  console.log(`color.fg256(${i}) ${color.fg256(i, 'Text content')} - color.fg256(${i+8}) ${color.fg256(i+8, 'Text content')}`);
  console.log(`color.bg256(${i}) ${color.bg256(i, 'Text content')} - color.bg256(${i+8}) ${color.bg256(i+8, 'Text content')}`);

}
console.groupEnd();

console.group('color.fg256 && color.bg256 - Colorfull');
for(let i = 16; i <= 232; i++) {
  console.log(`color.fg256(${i}) ${color.fg256(i, 'Text content')} - color.bg256(${i}) ${color.bg256(i, 'Text content')}`)
}
console.groupEnd();

console.group('color.fg256 && color.bg256 - Gray');
for(let i = 232; i <= 255; i++) {
  console.log(`color.fg256(${i}) ${color.fg256(i, 'Text content')} - color.bg256(${i}) ${color.bg256(i, 'Text content')}`)
}
console.groupEnd();

console.group('color.fgRGB - Random');
  const arrRGB = [1,2,3].map(x=>Math.random()*256|0)
  console.log(`color.fgRGB ${arrRGB} ${color.fgRGB(arrRGB, 'Text content')}`)
console.groupEnd()
