import cli from "./cli.mjs";
import { test, assert, run } from '@jlbyte/tester';
import { fs } from '@jlbyte/sys';
import path from "path";

/*
// ANSI
test('prepare: ansi', async ()=> {
  fs.folder('./temp/ansi');
  fs.copy('../ansi/package.json', './temp/ansi/package.json', { overwrite: true });
  fs.copy('../ansi/src', './temp/ansi/src', { overwrite: true });
  fs.delete('./temp/ansi/dist');

  assert.ok(fs.exists('./temp/ansi'));
  assert.ok(fs.exists('./temp/ansi/package.json'));
  assert.ok(fs.exists('./temp/ansi/src'));
  assert.ok(!fs.exists('./temp/ansi/dist'));
});
test('cli.run: ansi - basic', async ()=> {
  await cli.run(['build','js', './temp/ansi/src/index.mjs', './temp/ansi/dist']);
  
  assert.equal(cli.ctx.build.type, 'js');
  assert.equal(cli.ctx.build.input, './temp/ansi/src/index.mjs');
  assert.equal(cli.ctx.build.output, './temp/ansi/dist');
  assert.equal(cli.ctx.option.format, 'es,cjs');
  assert.equal(cli.ctx.option.name, 'index');
  assert.ok(!cli.ctx.option.exclude);
  assert.deepEqual(cli.ctx.cmds[0], cli.ctx.rollup[0].split(' '));
  assert.deepEqual(cli.ctx.cmds[1], cli.ctx.rollup[1].split(' '));
  assert.ok(fs.exists('./temp/ansi/dist/index.mjs'));
  assert.ok(fs.exists('./temp/ansi/dist/index.cjs'));
  assert.ok(fs.exists('./temp/ansi/dist/index.d.mts'));
});
test('cli.run: ansi - current', async ()=> {
  await cli.run(['build','js', './temp/ansi/src/index.mjs', './temp/ansi/dist', '-n', 'ansi', '-f', 'es,cjs,iife']);
  
  assert.equal(cli.ctx.option.format, 'es,cjs,iife');
  assert.equal(cli.ctx.option.name, 'ansi');
  assert.deepEqual(cli.ctx.cmds[0], cli.ctx.rollup[0].split(' '));
  assert.deepEqual(cli.ctx.cmds[1], cli.ctx.rollup[1].split(' '));
  assert.deepEqual(cli.ctx.cmds[2], cli.ctx.rollup[2].split(' '));
  assert.ok(fs.exists('./temp/ansi/dist/ansi.d.mts'));
});

test('cli.run: ansi - advance', async ()=> {
  await cli.run(['build','js', './temp/ansi/src/index.mjs', './temp/ansi/dist', '-n', 'ansi', '-f', 'es,cjs,iife', '-p', './temp/ansi/package.json']);
  let pkg = JSON.parse(fs.file.read(cli.ctx.option.package));
  
  assert.equal(pkg.main, 'dist/ansi.cjs');
  assert.equal(pkg.module, 'dist/ansi.mjs');
  assert.equal(pkg.jsdelivr, 'dist/ansi.js');
  assert.equal(pkg.exports['.'].types, './dist/ansi.d.mts');
  assert.equal(pkg.exports['.'].import, './dist/ansi.mjs');
  assert.equal(pkg.exports['.'].require, './dist/ansi.cjs');
});

// ENV
test('prepare: env', async ()=> {
  fs.folder('./temp/env');
  fs.copy('../env/package.json', './temp/env/package.json', { overwrite: true });
  fs.copy('../env/src', './temp/env/src', { overwrite: true });
  fs.delete('./temp/env/dist');

  assert.ok(fs.exists('./temp/env'));
  assert.ok(fs.exists('./temp/env/package.json'));
  assert.ok(fs.exists('./temp/env/src'));
  assert.ok(!fs.exists('./temp/env/dist'));
});

test('cli.run: env - basic', async ()=> {
  await cli.run(['build', 'js', './temp/env/src/env.mjs', './temp/env/dist', '-n', 'env', '-f', 'es,cjs,iife', '-e', 'bowser']);

  assert.equal(cli.ctx.build.type, 'js');
  assert.equal(cli.ctx.build.input, './temp/env/src/env.mjs');
  assert.equal(cli.ctx.build.output, './temp/env/dist');
  assert.equal(cli.ctx.option.format, 'es,cjs,iife');
  assert.equal(cli.ctx.option.name, 'env');
  assert.equal(cli.ctx.option.exclude, 'bowser');
  assert.deepEqual(cli.ctx.cmds[0], cli.ctx.rollup[0].split(' '));
  assert.deepEqual(cli.ctx.cmds[1], cli.ctx.rollup[1].split(' '));
  assert.deepEqual(cli.ctx.cmds[2], cli.ctx.rollup[2].split(' '));
  assert.ok(fs.exists('./temp/env/dist/env.mjs'));
  assert.ok(fs.exists('./temp/env/dist/env.cjs'));
  assert.ok(fs.exists('./temp/env/dist/env.d.mts'));
});

test('cli.run: env - advance', async ()=> {
  await cli.run(['build', 'js', './temp/env/src/env.mjs', './temp/env/dist', '-n', 'env', '-f', 'es,cjs,iife', '-e', 'bowser', '-p', './temp/env/package.json']);
  let pkg = JSON.parse(fs.file.read(cli.ctx.option.package));
  
  assert.equal(pkg.main, 'dist/env.cjs');
  assert.equal(pkg.module, 'dist/env.mjs');
  assert.equal(pkg.jsdelivr, 'dist/env.js');
  assert.equal(pkg.exports['.'].types, './dist/env.d.mts');
  assert.equal(pkg.exports['.'].import, './dist/env.mjs');
  assert.equal(pkg.exports['.'].require, './dist/env.cjs');
});
*/

// TESTER
test('prepare: tester', async ()=> {
  fs.folder('./temp/tester');
  fs.copy('../tester/package.json', './temp/tester/package.json', { overwrite: true });
  fs.copy('../tester/src', './temp/tester/src', { overwrite: true });
  fs.delete('./temp/tester/dist');

  assert.ok(fs.exists('./temp/tester'));
  assert.ok(fs.exists('./temp/tester/package.json'));
  assert.ok(fs.exists('./temp/tester/src'));
  assert.ok(!fs.exists('./temp/tester/dist'));
});

await run();

// End
//fs.delete('./temp');

// History


//cli.run(['build', 'js', './temp/cmd/src/Cmd.mjs', './temp/cmd/dist', '-n', 'Cmd', '-e', '@jlbyte/ansi', '-f', 'es,cjs']);
//cli.run(['build', 'js', './temp/tester/src/tester.mjs', './temp/tester/dist', '-n', 'tester', '-f', 'es,cjs,iife', '-e', '@jlbyte/ansi,@jlbyte/env'])
//cli.run(['build','js', './temp/dialog/index.mjs', './temp/dialog', '-f', 'es,cjs', '-e', '@clack/prompts']);
