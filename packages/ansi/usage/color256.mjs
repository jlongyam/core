import color from '@jlbyte/ansi/color';

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
