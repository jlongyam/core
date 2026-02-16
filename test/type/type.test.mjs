import { assert, test, type } from '../../dist/core.mjs';

const { it, run } = test;

it('string', () => {
    assert(type("hello") === "string");
});

it('detects number', () => {
    assert(type(42) === "number");
});

it('detects boolean', () => {
    assert(type(true) === "boolean");
});

it('detects null (the tricky one)', () => {
    assert(type(null) === "null");
});

it('detects array', () => {
    assert(type([]) === "array");
});

it('detects function', () => {
    assert(type(() => {}) === "function");
});

it('detects object', () => {
    assert(type({}) === "object");
});

run();
