import { cli } from "./cli.mjs";
import { assert, test, run } from '@jlbyte/tester';
import { fs } from '@jlbyte/sys';

test('prepare: ansi', async()=> {
  fs.folder('./temp/ansi');
  fs.copy('../ansi/package.json', './temp/ansi/package.json', { overwrite: true });
  fs.copy('../ansi/src', './temp/ansi/src', { overwrite: true });
  fs.delete('./temp/ansi/dist');

  assert.ok(fs.exists('./temp/ansi'));
  assert.ok(fs.exists('./temp/ansi/package.json'));
  assert.ok(fs.exists('./temp/ansi/src'));
  assert.ok(!fs.exists('./temp/ansi/dist'));
});

test('cli input', async()=> {
  let parse = cli.parse(['build','./temp/ansi/src/index.mjs', './temp/ansi/dist']);

  console.log(parse);
})
await run()
// let parse = cli.parse(['node', 'js', 'build', 'file.js', 'dir', '-f', 'es,cjs,iife']);
// console.log(parse)
// cli.parse(['node', 'js', 'build', 'file.js', 'dir', '-f', 'es,cjs,iife']);

