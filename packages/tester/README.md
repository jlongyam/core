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
      "@jlbyte/ansi": "https://esm.sh/@jlbyte/ansi@1.2.1",
      "@jlbyte/env": "https://esm.sh/@jlbyte/env@1.1.0",
      "@jlbyte/tester": "https://esm.sh/@jlbyte/tester@1.0.2"
    }
  }
</script>
<link href="https://esm.sh/@jlbyte/tester@1.0.2/dist/tester.css" rel="stylesheet">
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
