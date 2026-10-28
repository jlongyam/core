import { describe, test, it, beforeEach, run } from '../src/tester.mjs';
import expect from '../src/expect.mjs';

describe('Expect', ()=> {
  test('Usage', ()=> {
    console.assert(typeof expect === 'function')
  })
});

run()