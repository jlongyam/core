import argReverse from "../../src/function/argReverse.js";

function testFunction() {
  let args = argReverse(arguments);
  let argl = args.length;
  return {
    args: args,
    argl: argl
  }
}

let fn = testFunction();

console.log(fn)