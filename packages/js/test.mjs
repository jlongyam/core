import { cli } from "./cli.mjs";
import { assert, test, run } from '@jlbyte/tester';
import { fs } from '@jlbyte/sys';

// test('prepare: ansi', async()=> {
//   fs.folder('./temp/ansi');
//   fs.copy('../ansi/package.json', './temp/ansi/package.json', { overwrite: true });
//   fs.copy('../ansi/src', './temp/ansi/src', { overwrite: true });
//   fs.delete('./temp/ansi/dist');

//   assert.ok(fs.exists('./temp/ansi'));
//   assert.ok(fs.exists('./temp/ansi/package.json'));
//   assert.ok(fs.exists('./temp/ansi/src'));
//   assert.ok(!fs.exists('./temp/ansi/dist'));
// });

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

await run();
