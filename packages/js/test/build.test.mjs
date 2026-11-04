import build from "../src/build.mjs";
import { assert, test, run } from '@jlbyte/tester';
import { fs } from '@jlbyte/sys';

test('build: ansi - default', async ()=> {
  fs.delete('./temp/ansi/dist');
  await build('./temp/ansi/src/index.mjs', './temp/ansi/dist');
  
  assert.ok(fs.file.exists('./temp/ansi/dist/index.mjs'));
  assert.ok(fs.file.exists('./temp/ansi/dist/index.cjs'));
  assert.ok(fs.file.exists('./temp/ansi/dist/index.d.mts'));
});
test('build: ansi - name', async ()=> {
  fs.delete('./temp/ansi/dist');
  await build('./temp/ansi/src/index.mjs', './temp/ansi/dist', { name: 'ansi' });
  
  assert.ok(fs.file.exists('./temp/ansi/dist/ansi.mjs'));
  assert.ok(fs.file.exists('./temp/ansi/dist/ansi.cjs'));
  assert.ok(fs.file.exists('./temp/ansi/dist/ansi.d.mts'));
});
test('build: ansi - iife', async ()=> {
  fs.delete('./temp/ansi/dist');
  await build('./temp/ansi/src/index.mjs', './temp/ansi/dist', { name: 'ansi', format: 'es,cjs,iife' });
  
  assert.ok(fs.file.exists('./temp/ansi/dist/ansi.js'));
});
test('build: ansi - package', async ()=> {
  fs.delete('./temp/ansi/dist');
  await build('./temp/ansi/src/index.mjs', './temp/ansi/dist', { name: 'ansi', format: 'es,cjs,iife', package: './temp/ansi/package.json' });
  const pkg = await JSON.parse(fs.file.read('./temp/ansi/package.json'));  
  
  assert.equal(pkg.main, 'dist/ansi.cjs');
  assert.equal(pkg.module, 'dist/ansi.mjs');
  assert.equal(pkg.jsdelivr, 'dist/ansi.js');
  assert.equal(pkg.exports['.'].types, './dist/ansi.d.mts');
  assert.equal(pkg.exports['.'].import, './dist/ansi.mjs');
  assert.equal(pkg.exports['.'].require, './dist/ansi.cjs');
});
test('build: env - full', async ()=> {
  fs.delete('./temp/env/dist');
  await build('./temp/env/src/env.mjs', './temp/env/dist', { exclude: 'bowser', format: 'es,cjs,iife', package: './temp/env/package.json' });

  assert.ok(fs.file.exists('./temp/env/dist/env.mjs'));
  assert.ok(fs.file.exists('./temp/env/dist/env.cjs'));
  assert.ok(fs.file.exists('./temp/env/dist/env.js'));
  assert.ok(fs.file.exists('./temp/env/dist/env.d.mts'));
  
  const pkg = await JSON.parse(fs.file.read('./temp/env/package.json'));

  assert.equal(pkg.main, 'dist/env.cjs');
  assert.equal(pkg.module, 'dist/env.mjs');
  assert.equal(pkg.jsdelivr, 'dist/env.js');
  assert.equal(pkg.exports['.'].types, './dist/env.d.mts');
  assert.equal(pkg.exports['.'].import, './dist/env.mjs');
  assert.equal(pkg.exports['.'].require, './dist/env.cjs');
});
test('build: tester - full', async ()=> {
  fs.delete('./temp/tester/dist');
  await build('./temp/tester/src/tester.mjs', './temp/tester/dist', { exclude: '@jlbyte/ansi,@jlbyte/env', format: 'es,cjs,iife', package: './temp/tester/package.json', asset: './temp/tester/src/tester.css' });

  assert.ok(fs.file.exists('./temp/tester/dist/tester.mjs'));
  assert.ok(fs.file.exists('./temp/tester/dist/tester.cjs'));
  assert.ok(fs.file.exists('./temp/tester/dist/tester.js'));
  assert.ok(fs.file.exists('./temp/tester/dist/tester.d.mts'));
  assert.ok(fs.file.exists('./temp/tester/dist/tester.css'));
  
  const pkg = await JSON.parse(fs.file.read('./temp/tester/package.json'));

  assert.equal(pkg.main, 'dist/tester.cjs');
  assert.equal(pkg.module, 'dist/tester.mjs');
  assert.equal(pkg.jsdelivr, 'dist/tester.js');
  assert.equal(pkg.exports['.'].types, './dist/tester.d.mts');
  assert.equal(pkg.exports['.'].import, './dist/tester.mjs');
  assert.equal(pkg.exports['.'].require, './dist/tester.cjs');
});
test('build: cmd - full', async ()=> {
  fs.delete('./temp/cmd/dist');
  await build('./temp/cmd/src/index.mjs', './temp/cmd/dist', { exclude: 'cac', package: './temp/cmd/package.json' });

  assert.ok(fs.file.exists('./temp/cmd/dist/index.mjs'));
  assert.ok(fs.file.exists('./temp/cmd/dist/index.cjs'));
  assert.ok(fs.file.exists('./temp/cmd/dist/index.d.mts'));

  const pkg = await JSON.parse(fs.file.read('./temp/cmd/package.json'));  
  
  assert.equal(pkg.main, 'dist/index.cjs');
  assert.equal(pkg.module, 'dist/index.mjs');
  assert.equal(pkg.exports['.'].types, './dist/index.d.mts');
  assert.equal(pkg.exports['.'].import, './dist/index.mjs');
  assert.equal(pkg.exports['.'].require, './dist/index.cjs');
});
test('build: sys - full', async ()=> {
  fs.delete('./temp/sys/dist');
  await build('./temp/sys/src/sys.mjs', './temp/sys/dist', { exclude: 'child_process,fs-jetpack', package: './temp/sys/package.json' });

  assert.ok(fs.file.exists('./temp/sys/dist/sys.mjs'));
  assert.ok(fs.file.exists('./temp/sys/dist/sys.cjs'));
  assert.ok(fs.file.exists('./temp/sys/dist/sys.d.mts'));

  const pkg = await JSON.parse(fs.file.read('./temp/sys/package.json'));  
  
  assert.equal(pkg.main, 'dist/sys.cjs');
  assert.equal(pkg.module, 'dist/sys.mjs');
  assert.equal(pkg.exports['.'].types, './dist/sys.d.mts');
  assert.equal(pkg.exports['.'].import, './dist/sys.mjs');
  assert.equal(pkg.exports['.'].require, './dist/sys.cjs');
});
test('build: dialog - full', async ()=> {
  fs.delete('./temp/dialog/dist');
  await build('./temp/dialog/src/index.mjs', './temp/dialog/dist', { name: 'dialog', exclude: '@clack/prompts', package: './temp/dialog/package.json' });

  assert.ok(fs.file.exists('./temp/dialog/dist/dialog.mjs'));
  assert.ok(fs.file.exists('./temp/dialog/dist/dialog.cjs'));
  assert.ok(fs.file.exists('./temp/dialog/dist/dialog.d.mts'));

  const pkg = await JSON.parse(fs.file.read('./temp/dialog/package.json'));  
  
  assert.equal(pkg.main, 'dist/dialog.cjs');
  assert.equal(pkg.module, 'dist/dialog.mjs');
  assert.equal(pkg.exports['.'].types, './dist/dialog.d.mts');
  assert.equal(pkg.exports['.'].import, './dist/dialog.mjs');
  assert.equal(pkg.exports['.'].require, './dist/dialog.cjs');
});

await run();
