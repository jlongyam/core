import { assert, test, run } from '@jlbyte/tester';

test('Sample Test', ()=> {
  assert.equal(1,1)
});
test('Shoulf fail', ()=> {
  assert.ok(null, 'Aah')
});

await run();