# Env

Basic environment detector.

## Usage

```js
import env from "@jlbyte/env";

console.log(env);
```

### Browser

For browser usage, it require **bowser** as dependency

Use importmap:

```html
<script type="importmap">
  {
    "imports": {
      "bowser": "https://cdn.jsdelivr.net/npm/bowser@2.15.0/+esm"
    }
  }
</script>
```

> For IIFE: exclude `/+esm` from CDN link above. 

## License

[MIT](LICENSE)
