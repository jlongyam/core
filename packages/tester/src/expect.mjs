import deepEqual from './deepEqual.mjs';

class Expect {
  constructor(actual) {
    this.actual = actual;
  }
  toBe(expected) {
    if (this.actual !== expected) {
      throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(this.actual)}`);
    }
  }
  toEqual(expected) {
    if (!deepEqual(this.actual, expected)) {
      throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(this.actual)}`);
    }
  }
  toContain(expected) {
    if (Array.isArray(this.actual)) {
      if (!this.actual.includes(expected)) {
        throw new Error(`Expected array to contain ${JSON.stringify(expected)}`);
      }
    } else if (typeof this.actual === 'string') {
      if (!this.actual.includes(expected)) {
        throw new Error(`Expected string to contain "${expected}"`);
      }
    } else {
      throw new Error('toContain() can only be used with arrays or strings');
    }
  }
  toHaveLength(expected) {
    if (!this.actual || typeof this.actual.length !== 'number') {
      throw new Error('Expected value to have a length property');
    }
    if (this.actual.length !== expected) {
      throw new Error(`Expected length ${expected} but got ${this.actual.length}`);
    }
  }
  toBeInstanceOf(expected) {
    if (!(this.actual instanceof expected)) {
      throw new Error(`Expected instance of ${expected.name} but got ${typeof this.actual}`);
    }
  }
  toThrow(expectedMessage) {
    if (typeof this.actual !== 'function') {
      throw new Error('Expected a function');
    }
    let didThrow = false;
    let thrownError = null;
    try {
      this.actual();
    } catch (error) {
      didThrow = true;
      thrownError = error;
    }
    if (!didThrow) {
      throw new Error('Expected function to throw an error');
    }
    if (expectedMessage && !thrownError.message.includes(expectedMessage)) {
      throw new Error(`Expected error message to contain "${expectedMessage}" but got "${thrownError.message}"`);
    }
  }
  toBeUndefined() {
    if (this.actual !== undefined) {
      throw new Error(`Expected undefined but got ${JSON.stringify(this.actual)}`);
    }
  }
  toBeDefined() {
    if (this.actual === undefined) {
      throw new Error('Expected value to be defined');
    }
  }
  toBeTruthy() {
    if (!this.actual) {
      throw new Error(`Expected truthy value but got ${JSON.stringify(this.actual)}`);
    }
  }
  toBeFalsy() {
    if (this.actual) {
      throw new Error(`Expected falsy value but got ${JSON.stringify(this.actual)}`);
    }
  }
}

const expect = new Expect()
export default expect;