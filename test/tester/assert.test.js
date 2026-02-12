import assert from '../../src/tester/assert.js'
import { color, icon } from '@jlongyam/ansi';

console.group(`${icon.arrow.right} ${ color.magenta('assert')}`);
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

console.group(`${icon.arrow.right} ${ color.magenta('assert.ok')}`);
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

