function deepEqual(a, b) {
  if (a === b) return true;
  if (a === null || typeof a !== "object" || b === null || typeof b !== "object") {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }
  return true;
}
function assert(truthy, message) {
  if (!truthy) {
    throw new Error(message || 'Assertion failed');
  }
}
assert.ok = function (value, message) {
  if (!value) {
    throw new Error(message || `Expected ${value} to be truthy`);
  }
};
assert.equal = function (actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `${actual} !== ${expected}`);
  }
};
assert.deepEqual = function (actual, expected, message) {
  if (!deepEqual(actual, expected)) {
    throw new Error(message || `Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
  }
};

export default assert;