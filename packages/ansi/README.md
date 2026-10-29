# ANSI

It is core ansi library

> Install: `npm i @jlbyte/ansi --prefer-offline`

## Usage

Basic of ansi escape is `code`

```js
import {code} from '@jlbyte/ansi';
// display all format
console.log(code);
```

### Icon

Terminal safe icon collection

```js
import {icon} from '@jlbyte/ansi';
// display all icons
console.log(icon);
```

### Style

Use `textStyle` in `code`

```js
import { style } from "@jlbyte/ansi";

console.log('Normal text', style.underline('Underline'), 'Not underline')
// other style
console.log(code.textStyle)
// bold, dim, italic,
// blink (browser only),
// rapid (not used),
// inverse (browser only),
// invisible,
// strike
```

### Color

```js
import { color } from '@jlbyte/ansi';
// fg: text color alias foreground
console.log(color.fg.red('Text red'));
// fgBright: foreground bright
console.log(color.fgBright.red('Text red'));
// bg: background color
console.log(color.bg.red('Text red'));
// bgBright: background color bright
console.log(color.bgBright.red('Text red'));
```

Shorten

```js
const { fg, bg, fgBright, bgBright } = color;

console.log(fg.blue('Blue color'));
```

> **Note**: there is no **gray** color, use `[fg|bg]`**Bright**`.black` instead.

### HTML

Convert ansi to html tag using inline css 

- Check raw output

```js
import { color, html } from "@jlbyte/ansi";

let sentence = [
  `Color ${color.fg.red('red')} and ${color.bg.yellow('Yellow')} background`,
  `This is RGB ${color.fgRGB([238, 75, 43], 'Bright Red')} actually`
];

console.log(html(sentence[0]));
console.log(html(sentence[1]))
```

- Inside HTML script

```html
<script type="importmap">
  {
    "imports": {
      "@jlbyte/ansi": "https://cdn.jsdelivr.net/npm/@jlbyte/ansi@1.2.2/+esm"
    }
  }
</script>
<pre id ="ouput"></pre>
<script type="module">
  import { icon, html, color } from '@jlbyte/ansi';

  const { fg, fgBright, bg, bgBright } = color;
  const output = document.getElementById('output');

  output.innerHTML += html(`Color ${fgBright.red('red')}`)+'<br>';
  output.innerHTML += html(`And ${bg.yellow('Yellow')} background`)+'<br>';

  output.innerHTML += `Icons<br> ${JSON.stringify( icon, 0, 2)}`;
</script>
```

## Tips

Another useful packages

- for **box** - see [boxen](https://npmx.dev/package/boxen)
- for **spinner** - see [yocto-spinner](https://npmx.dev/package/yocto-spinner)
- for **table** - see [cli-table3](https://npmx.dev/package/cli-table3)
- for **link** - see [termi-link](https://npmx.dev/package/termi-link)
- for **progress** see [progress](https://npmx.dev/package/progress)

## License

[MIT](LICENSE)
