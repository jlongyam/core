'use strict'

var env = (function() {
  var browser = (typeof window !== 'undefined' && typeof document !== 'undefined');
  var worker = (typeof importScripts !== 'undefined');
  var cli = (!browser && !worker);
  return {
    browser: browser,
    worker: worker,
    cli: cli
  }
})();