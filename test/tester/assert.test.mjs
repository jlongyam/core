import { assert } from '../../dist/core.mjs';


console.group('assert');
  try {
    assert(false);
    console.log('X false');
  } catch(e) {
    console.log('√ false');
  }
  try {
    assert(true);
    console.log('√ true');
  } catch(e) {
    console.log('X true');
  }
console.groupEnd();

console.group('assert.ok');
  try {
    assert.ok(0);
    console.log('X 0');
  } catch(e) {
    console.log('√ 0');
  }
  try {
    assert.ok(1);
    console.log('√ 1');
  } catch(e) {
    console.log('X 1');
  }
console.groupEnd();

console.group('assert.equal')
  try {
    assert.equal(1, '1', 'should false');
    console.log(`X 1, '1', 'should false'`);
  } catch(e) {
    console.log(`√ 1, '1, 'should false'`);
  }
  try {
    assert.equal(1, 1, 'should true');
    console.log(`√ 1,1, 'should true'`);
  } catch(e) {
    console.log(`X 1,1, 'should true'`);
  }
console.groupEnd();

console.group('assert.deepEqual')
  try {
    assert.deepEqual({1:1,2:2},[1,2], 'should false');
    console.log(`X {1:1,2:2},[1,2], 'should false'`);
  } catch(e) {
    console.log(`√ {1:1,2:2},[1,2], 'should false'`);
  }
  try {
    assert.deepEqual({0:1,1:2},[1,2], 'should true');
    console.log(`√ {0:1,1:2},[1,2], 'should true'`);
  } catch(e) {
    console.log(`X {0:1,1:2},[1,2], 'should true'`);
  }
console.groupEnd();
