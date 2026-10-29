# Env

Basic environment detector.

## Usage

```js
import env from "@jlbyte/env";

console.log(env);
```

### Browser

For browser usage, it require **bowser** as dependency

> CDN: `https://cdn.jsdelivr.net/npm`

- Using importmap:

```html
<script type="importmap">
  {
    "imports": {
      "bowser": "{CDN}/bowser@2.15.0/+esm",
      "@jlbyte/env": "{CDN}/@jlbyte/env@1.1.1/+esm"
    }
  }
</script>
<script type="module">
  import env from '@jlbyte/env';

  console.log(env);
</script>
```

- Using iife:

```html
<script src="{CDN}/bowser@2.15.0/es5.min.js"></script>
<script src="{CDN}/@jlbyte/env@1.1.1/dist/env.min.js"></script>
<script>
  console.log(env);
</script>
```

## License

[MIT](LICENSE)
