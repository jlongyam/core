import { assert, test } from '../../dist/core.mjs';

const { it, run } = test;

it("Array length", function () {
  var arr = [1, 2, 3];
  assert(arr.length === 3, "Expected length 3");
});
it("Array length", function () {
  var arr = [1, 2, 3];
  assert(arr.length === 4, "This test is designed to fail, Expected length 3");
});

it("String concatenation", function () {
  var result = "Hello" + " " + "World";
  assert(result === "Hello World", "Concatenation failed");
});

it("Object property", function () {
  var obj = { prop: "value" };
  assert(obj.prop === "value", "Property access failed");
});

it("Failing test example", function () {
  assert(1 === 2, "This test is designed to fail, Expected tobe false");
});

run()
