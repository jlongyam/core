var core = function(exports, ansi, env) {
  function _typeof(o) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
      return typeof o;
    } : function(o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function deepEqual(a, b) {
    if (a === b) return !0;
    if (null === a || "object" !== _typeof(a) || null === b || "object" !== _typeof(b)) return !1;
    var keysA = Object.keys(a), keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return !1;
    for (var _i = 0, _keysA = keysA; _i < _keysA.length; _i++) {
      var key = _keysA[_i];
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return !1;
    }
    return !0;
  }
  function assert(truthy, message) {
    if (!truthy) throw new Error(message || "Assertion failed");
  }
  assert.ok = function(value, message) {
    if (!value) throw new Error(message || "Expected " + value + " to be truthy");
  }, assert.equal = function(actual, expected, message) {
    if (actual !== expected) throw new Error(message || actual + " !== " + expected);
  }, assert.deepEqual = function(actual, expected, message) {
    if (!deepEqual(actual, expected)) throw new Error(message || "Expected " + JSON.stringify(expected) + " but got " + JSON.stringify(actual));
  };
  var Test = {
    report: [],
    result: {
      passed: 0,
      failed: 0
    },
    add: function(name, fn) {
      this.report.push({
        name: name,
        fn: fn
      });
    },
    run: function() {
      this.result = {
        passed: 0,
        failed: 0
      }, console.group("\n" + ansi.style.underline("Test") + "\n");
      for (var i = 0; i < this.report.length; i++) {
        var test = this.report[i];
        try {
          test.fn(), this.result.passed++, console.log(ansi.color.green(ansi.icon.ok) + " " + ansi.color.blue(test.name));
        } catch (e) {
          this.result.failed++, console.log(ansi.color.red(ansi.icon.notOk) + " " + ansi.color.red(test.name)), 
          console.groupCollapsed(), console.log("" + ansi.style.dim(e.message)), console.groupEnd();
        }
      }
      console.groupEnd(), console.group("\n" + ansi.style.underline("Result") + "\n"), 
      console.info(ansi.bg.green(ansi.color.black(" " + this.result.passed + " ")) + " " + ansi.color.green("passed") + ", " + ansi.bg.red(" " + this.result.failed + " ") + " " + ansi.color.red("failed")), 
      console.groupEnd(), env.cli && this.result.failed > 0 && process.exit(1);
    }
  }, runner = Object.freeze({
    __proto__: null,
    it: function(name, fn) {
      Test.add(name, fn);
    },
    run: function() {
      Test.run();
    }
  });
  return exports.assert = assert, exports.test = runner, exports;
}({}, ansi, env);
