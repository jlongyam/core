import assert from './assert.mjs';

const now = () => (globalThis.performance ? performance.now() : Date.now());

function makeSuite(name, parent = null) {
  return { name, parent, items: [], before: [], after: [], beforeEach: [], afterEach: [], mode: 'normal' };
}

const root = makeSuite('');
let current = root;

function describe(name, fn) {
  const suite = makeSuite(name, current);
  current.items.push({ type: 'suite', suite });
  const prev = current;
  current = suite;
  try { fn(); } finally { current = prev; }
}

function test(name, fn, opts = {}) {
  current.items.push({ type: 'test', name, fn, timeout: opts.timeout, mode: opts.mode || 'normal' });
}
test.skip = (name, fn, opts) => test(name, fn, { ...opts, mode: 'skip' });
test.only = (name, fn, opts) => test(name, fn, { ...opts, mode: 'only' });

const beforeAll = (fn) => current.before.push(fn);
const afterAll = (fn) => current.after.push(fn);
const beforeEach = (fn) => current.beforeEach.push(fn);
const afterEach = (fn) => current.afterEach.push(fn);

async function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timeout of ${ms}ms exceeded: ${label}`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

const chain = (suite, key) => {
  const out = [];
  for (let s = suite; s; s = s.parent) out.push(...s[key]);
  return out;
};
const hasOnly = (suite) =>
  suite.items.some((i) => (i.type === 'test' ? i.mode === 'only' : hasOnly(i.suite)));

async function run({ files = [], timeout = 5000, log = console.log } = {}) {
  for (const f of files) await import(f);

  const onlyMode = hasOnly(root);
  const result = { passed: 0, failed: 0, skipped: 0, failures: [] };
  const start = now();

  async function runSuite(suite, depth) {
    const pad = '  '.repeat(depth);
    if (suite.name) log(`${pad}${suite.name}`);
    for (const fn of suite.before) await fn();
    for (const item of suite.items) {
      if (item.type === 'suite') { await runSuite(item.suite, depth + 1); continue; }
      const fullName = [...pathOf(suite), item.name].join(' > ');
      if (item.mode === 'skip' || (onlyMode && item.mode !== 'only')) {
        result.skipped++;
        log(`${pad}  - ${item.name} (skipped)`);
        continue;
      }
      const t0 = now();
      try {
        for (const fn of chain(suite, 'beforeEach').reverse()) await fn();
        await withTimeout(Promise.resolve().then(item.fn), item.timeout ?? timeout, fullName);
        result.passed++;
        log(`${pad}  ✓ ${item.name} (${Math.round(now() - t0)}ms)`);
      } catch (error) {
        result.failed++;
        result.failures.push({ name: fullName, error });
        log(`${pad}  ✗ ${item.name}`);
      } finally {
        try { for (const fn of chain(suite, 'afterEach')) await fn(); } catch (e) {
          result.failed++; result.failures.push({ name: `${fullName} (afterEach)`, error: e });
        }
      }
    }
    for (const fn of suite.after) await fn();
  }

  const pathOf = (suite) => {
    const names = [];
    for (let s = suite; s; s = s.parent) if (s.name) names.unshift(s.name);
    return names;
  };

  await runSuite(root, 0);

  log('');
  for (const { name, error } of result.failures) {
    log(`FAIL ${name}\n  ${error?.stack || error}\n`);
  }
  log(`${result.passed} passed, ${result.failed} failed, ${result.skipped} skipped (${Math.round(now() - start)}ms)`);

  exit(result.failed ? 1 : 0);
  return result;
}

function exit(code) {
  if (!code) return;
  if (globalThis.Deno?.exit) globalThis.Deno.exit(code);
  else if (globalThis.process?.exit) globalThis.process.exit(code);
}

export {
  describe,
  test,
  test as it,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  run
};