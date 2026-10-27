import link from '@jlbyte/ansi/link'
import color from '@jlbyte/ansi/color';

const url = link(color.fg.magenta('example'), 'https://example.com');

console.log(url);