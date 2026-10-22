'use strict'

const browser = (typeof window !== 'undefined' && typeof document !== 'undefined');
const worker = (typeof importScripts !== 'undefined');
const cli = (!browser && !worker);

module.exports = { browser, worker, cli }
