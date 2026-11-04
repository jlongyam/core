import { cli } from "../src/cli.mjs";
import { assert, test, run } from '@jlbyte/tester';
import { fs } from '@jlbyte/sys';

test('cli: ansi', async()=> {
  cli.parse(['node', 'js', 'build', './temp/ansi/src/index.mjs', './temp/ansi/dist', '-f', 'es,cjs,iife', '-n', 'ansi', '-p', './temp/ansi/package.json']);
  assert.ok(fs.file.exists('./temp/ansi/dist/ansi.mjs'));
  assert.ok(fs.file.exists('./temp/ansi/dist/ansi.cjs'));
  assert.ok(fs.file.exists('./temp/ansi/dist/ansi.js'));
  assert.ok(fs.file.exists('./temp/ansi/dist/ansi.d.mts'));

  let pkg = await JSON.parse(fs.file.read('./temp/ansi/package.json'));  
  assert.equal(pkg.main, 'dist/ansi.cjs');
  assert.equal(pkg.module, 'dist/ansi.mjs');
  assert.equal(pkg.jsdelivr, 'dist/ansi.js');
  assert.equal(pkg.exports['.'].types, './dist/ansi.d.mts');
  assert.equal(pkg.exports['.'].import, './dist/ansi.mjs');
  assert.equal(pkg.exports['.'].require, './dist/ansi.cjs');
});

test('cli: env', async()=> {
  cli.parse(['node', 'js', 'build', './temp/env/src/env.mjs', './temp/env/dist', '-f', 'es,cjs,iife', '-p', './temp/env/package.json']);
  assert.ok(fs.file.exists('./temp/env/dist/env.mjs'));
  assert.ok(fs.file.exists('./temp/env/dist/env.cjs'));
  assert.ok(fs.file.exists('./temp/env/dist/env.js'));
  assert.ok(fs.file.exists('./temp/env/dist/env.d.mts'));

  let pkg = await JSON.parse(fs.file.read('./temp/env/package.json'));  
  assert.equal(pkg.main, 'dist/env.cjs');
  assert.equal(pkg.module, 'dist/env.mjs');
  assert.equal(pkg.jsdelivr, 'dist/env.js');
  assert.equal(pkg.exports['.'].types, './dist/env.d.mts');
  assert.equal(pkg.exports['.'].import, './dist/env.mjs');
  assert.equal(pkg.exports['.'].require, './dist/env.cjs');
});

test('cli: tester', async()=> {
  cli.parse(['node', 'js', 'build', './temp/tester/src/tester.mjs', './temp/tester/dist', '-f', 'es,cjs,iife', '-p', './temp/tester/package.json', '-a', './temp/tester/src/tester.css']);
  assert.ok(fs.file.exists('./temp/tester/dist/tester.mjs'));
  assert.ok(fs.file.exists('./temp/tester/dist/tester.cjs'));
  assert.ok(fs.file.exists('./temp/tester/dist/tester.js'));
  assert.ok(fs.file.exists('./temp/tester/dist/tester.d.mts'));
  assert.ok(fs.file.exists('./temp/tester/dist/tester.css'));

  let pkg = await JSON.parse(fs.file.read('./temp/tester/package.json'));  
  assert.equal(pkg.main, 'dist/tester.cjs');
  assert.equal(pkg.module, 'dist/tester.mjs');
  assert.equal(pkg.jsdelivr, 'dist/tester.js');
  assert.equal(pkg.exports['.'].types, './dist/tester.d.mts');
  assert.equal(pkg.exports['.'].import, './dist/tester.mjs');
  assert.equal(pkg.exports['.'].require, './dist/tester.cjs');
});

test('cli: cmd', async()=> {
  cli.parse(['node', 'js', 'build', './temp/cmd/src/index.mjs', './temp/cmd/dist', '-e', 'cac', '-n', 'cmd', '-p', './temp/cmd/package.json']);
  assert.ok(fs.file.exists('./temp/cmd/dist/cmd.mjs'));
  assert.ok(fs.file.exists('./temp/cmd/dist/cmd.cjs'));
  assert.ok(fs.file.exists('./temp/cmd/dist/cmd.d.mts'));

  let pkg = await JSON.parse(fs.file.read('./temp/cmd/package.json'));  
  assert.equal(pkg.main, 'dist/cmd.cjs');
  assert.equal(pkg.module, 'dist/cmd.mjs');
  assert.equal(pkg.exports['.'].types, './dist/cmd.d.mts');
  assert.equal(pkg.exports['.'].import, './dist/cmd.mjs');
  assert.equal(pkg.exports['.'].require, './dist/cmd.cjs');
});

test('cli: sys', async()=> {
  cli.parse(['node', 'js', 'build', './temp/sys/src/sys.mjs', './temp/sys/dist', '-e', 'child_process,fs-jetpack', '-p', './temp/sys/package.json']);
  assert.ok(fs.file.exists('./temp/sys/dist/sys.mjs'));
  assert.ok(fs.file.exists('./temp/sys/dist/sys.cjs'));
  assert.ok(fs.file.exists('./temp/sys/dist/sys.d.mts'));

  let pkg = await JSON.parse(fs.file.read('./temp/sys/package.json'));  
  assert.equal(pkg.main, 'dist/sys.cjs');
  assert.equal(pkg.module, 'dist/sys.mjs');
  assert.equal(pkg.exports['.'].types, './dist/sys.d.mts');
  assert.equal(pkg.exports['.'].import, './dist/sys.mjs');
  assert.equal(pkg.exports['.'].require, './dist/sys.cjs');
});

test('cli: dialog', async()=> {
  cli.parse(['node', 'js', 'build', './temp/dialog/src/index.mjs', './temp/dialog/dist', '-n', 'dialog', '-e', '@clack/prompts', '-p', './temp/dialog/package.json']);
  assert.ok(fs.file.exists('./temp/dialog/dist/dialog.mjs'));
  assert.ok(fs.file.exists('./temp/dialog/dist/dialog.cjs'));
  assert.ok(fs.file.exists('./temp/dialog/dist/dialog.d.mts'));

  let pkg = await JSON.parse(fs.file.read('./temp/dialog/package.json'));  
  assert.equal(pkg.main, 'dist/dialog.cjs');
  assert.equal(pkg.module, 'dist/dialog.mjs');
  assert.equal(pkg.exports['.'].types, './dist/dialog.d.mts');
  assert.equal(pkg.exports['.'].import, './dist/dialog.mjs');
  assert.equal(pkg.exports['.'].require, './dist/dialog.cjs');
});

await run();
