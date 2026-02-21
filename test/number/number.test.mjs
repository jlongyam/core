import { assert, test, type, number_ } from "../../dist/core.mjs";

const { it, run } = test;

it('number_.core', ()=> { assert.equal(type(number_.core), 'object') });
it('number_.core.value', ()=> { assert.equal(number_.core.value, undefined) });
it('number_.core.extend', ()=> { assert.equal(type(number_.core.extend), 'function') });
it("number_.bytes", ()=> { assert.equal(type(number_.bytes), 'function') });

let n = 1024

it("number_bytes(<number>)", ()=> {
  assert.equal( number_.bytes(n - 1), '1023 Bytes' );
  assert.equal( number_.bytes(n), '1 KB' );
  assert.equal( number_.bytes(n * n), '1 MB' );
  assert.equal( number_.bytes(n * n * n), '1 GB' );
  assert.equal( number_.bytes(n * n * n * n), '1 TB' );
});

it("number_bytes(<number>[, <unit>])", ()=> {
  assert.equal( number_.bytes(1, 'KB'), 1024 );
  assert.equal( number_.bytes(1, 'MB'), 1048576 );
  assert.equal( number_.bytes(1.75, 'GB'), 1879048192 );
});

run();



