import assert from '../../src/tester/assert.js'
import { color, icon } from '@jlongyam/ansi';

console.group(`${icon.arrow.right} ${ color.yellow('assert')}`);
  try {
    assert(false);
    console.log(`${color.red(icon.notOk)} ${color.blue('false')}`);
  } catch(e) {
    console.log(`${color.green(icon.ok)} ${color.blue('false')}`);
  }
  try {
    assert(true);
    console.log(`${color.green(icon.ok)} ${color.blue('true')}`);
  } catch(e) {
    console.log(`${color.red(icon.notOk)} ${color.blue('true')}`);
  }
console.groupEnd();

console.group(`${icon.arrow.right} ${ color.yellow('assert.ok')}`);
  try {
    assert.ok(0);
    console.log(`${color.green(icon.notOk)} ${color.blue('0')}`);
  } catch(e) {
    console.log(`${color.green(icon.ok)} ${color.blue('0')}`);
  }
  try {
    assert.ok(1);
    console.log(`${color.green(icon.ok)} ${color.blue('1')}`);
  } catch(e) {
    console.log(`${color.green(icon.notOk)} ${color.blue('1')}`);
  }
console.groupEnd();

console.group(`${icon.arrow.right} ${ color.yellow('assert.equal')}`)
  try {
    assert.equal(1,"1", 'should false');
    console.log(`${color.green(icon.notOk)} ${color.blue(`1,"1", 'should false'`)}`);
  } catch(e) {
    console.log(`${color.green(icon.ok)} ${color.blue(`1,"1", 'should false'`)}`);
  }
  try {
    assert.equal(1,1, 'should true');
    console.log(`${color.green(icon.ok)} ${color.blue(`1,1, 'should true'`)}`);
  } catch(e) {
    console.log(`${color.green(icon.notOk)} ${color.blue(`1,1, 'should true'`)}`);
  }
console.groupEnd();

console.group(`${icon.arrow.right} ${ color.yellow('assert.deepEqual')}`)
  try {
    assert.deepEqual({1:1,2:2},[1,2], 'should false');
    console.log(`${color.green(icon.notOk)} ${color.blue(`{1:1,2:2},[1,2], 'should false'`)}`);
  } catch(e) {
    console.log(`${color.green(icon.ok)} ${color.blue(`{1:1,2:2},[1,2], 'should false'`)}`);
  }
  try {
    assert.deepEqual({0:1,1:2},[1,2], 'should true');
    console.log(`${color.green(icon.ok)} ${color.blue(`{0:1,1:2},[1,2], 'should true'`)}`);
  } catch(e) {
    console.log(`${color.green(icon.notOk)} ${color.blue(`{0:1,1:2},[1,2], 'should true'`)}`);
  }
console.groupEnd();
