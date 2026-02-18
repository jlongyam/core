import { assert, test, type } from '../../dist/core.mjs';

const { it, run } = test;

it('string', () => {
    assert(type("hello") === "string");
});

it('number', () => {
    assert(type(42) === "number");
});

it('boolean', () => {
    assert(type(true) === "boolean");
});

it('null', () => {
    assert(type(null) === "null");
});

it('array', () => {
    assert(type([]) === "array");
});

it('function', () => {
    assert(type(() => {}) === "function");
});

it('object', () => {
    assert(type({}) === "object");
});

run();
