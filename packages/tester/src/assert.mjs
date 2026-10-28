import deepEqual from './deepEqual.mjs';

class AssertionError extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
  }
}

function show(value) {
  const seen = new WeakSet();
  try {
    return JSON.stringify(value, (key, v) => {
      if (v === undefined) return '[undefined]';
      if (typeof v === 'number' && !Number.isFinite(v)) return `[${v}]`;
      if (typeof v === 'bigint') return `[${v}n]`;
      if (typeof v === 'function') return `[Function ${v.name || 'anonymous'}]`;
      if (typeof v === 'symbol') return v.toString();
      if (v instanceof Map) return { '[Map]': [...v] };
      if (v instanceof Set) return { '[Set]': [...v] };
      if (v instanceof RegExp) return String(v);
      if (v && typeof v === 'object') {
        if (seen.has(v)) return '[Circular]';
        seen.add(v);
      }
      return v;
    });
  } catch {
    return String(value);
  }
}

function assert(value, message) {
  if (!value) throw new AssertionError(message || `Expected ${show(value)} to be truthy`, value, true);
}

assert.ok = assert;

assert.equal = (actual, expected, message) => {
  if (!Object.is(actual, expected)) {
    throw new AssertionError(message || `Expected ${show(actual)} to be ${show(expected)}`, actual, expected);
  }
};

assert.deepEqual = (actual, expected, message) => {
  if (!deepEqual(actual, expected)) {
    throw new AssertionError(message || `Expected ${show(actual)} to deeply equal ${show(expected)}`, actual, expected);
  }
};

assert.throws = (fn, message) => {
  try { fn(); } catch { return; }
  throw new AssertionError(message || 'Expected function to throw', undefined, undefined);
};

export default assert;
