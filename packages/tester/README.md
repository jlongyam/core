# Tester

Tiny cross-runtime test runner,
Standard JS only.

## Support

- Node
- Deno
- Bun
- browsers

## Usage

### CLI

```js
import { assert, it, run } from '@jlbyte/tester';

it('Sample Test', ()=> {
  assert.equal(1,1)
});
it('Shoulf fail', ()=> {
  assert.ok(null, 'aah')
})

run()
```

### Browser

CDN pattern: 

- JSDELIVR: **`https://cdn.jsdelivr.net/npm/@jlbyte`**
- PKG: **`tester@1.1.0`**

```html
<script type="importmap">
  {
    "imports": {
      "@jlbyte/ansi": "{JSDELIVR}/ansi@1.2.1/+esm",
      "@jlbyte/env": "{JSDELIVR}/env@1.1.0/+esm",
      "@jlbyte/tester": "{JSDELIVR}/{PKG}/+esm"
    }
  }
</script>
<link href="{JSDELIVR}/{PKG}/dist/tester.css" rel="stylesheet">
<script type="module">
  import { assert, test, run } from '@jlbyte/tester';

  test('Sample Test', ()=> {
    assert.equal(1,1)
  });
  test('Shoulf fail', ()=> {
    assert.ok(null, 'Aah')
  });

  await run();
</script>
</body>
```

## License

License [MIT](LICENSE)
