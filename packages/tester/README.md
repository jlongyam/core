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

```html
<script type="importmap">
  {
    "imports": {
      "@jlbyte/ansi": "https://cdn.jsdelivr.net/npm/@jlbyte/ansi@1.2.1/+esm",
      "@jlbyte/env": "https://cdn.jsdelivr.net/npm/@jlbyte/env@1.1.0/+esm",
      "@jlbyte/tester": "https://cdn.jsdelivr.net/npm/@jlbyte/tester@1.0.0/+esm"
    }
  }
</script>
<link href="https://cdn.jsdelivr.net/npm/@jlbyte/env@1.1.0/dist/tester.css" rel="stylesheet">
<script type="module">
  import { assert, it, run } from '@jlbyte/tester';

  it('Sample Test', ()=> {
    assert.equal(1,1)
  });
  it('Shoulf fail', ()=> {
    assert.ok(null, 'aah')
  })

  await run()
</script>
</body>
```

## License

License [MIT](LICENSE)
