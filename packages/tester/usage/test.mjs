import { assert, it, run } from '@jlbyte/tester';

it('Sample Test', ()=> {
  assert.equal(1,1)
});
it('Shoulf fail', ()=> {
  assert.ok(null, 'aah')
})

run()