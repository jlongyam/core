
import { describe, test, it, beforeEach, run } from '../src/tester.mjs';
import assert from '../src/assert.mjs';
describe('math', () => {
  let n;
  beforeEach(() => { n = 2; });
  test('adds', () => assert.equal(n + 2, 4));
  it('async works', async () => {
    await new Promise((r) => setTimeout(r, 10));
    assert.deepEqual({ a: [1, 2] }, { a: [1, 2] });
  });
  test.skip('later', () => {});
  test('finishes in time', () => new Promise((r) => setTimeout(r, 10)), { timeout: 50 });
  describe('nested', () => {
    test('fails on purpose', () => assert.equal(1, 2));
    test('times out', () => new Promise(() => {}), { timeout: 50 });
  });
  
});

await run();
