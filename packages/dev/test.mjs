import cli from "./cli.mjs";
import { test, assert, run } from '@jlbyte/tester';
import { fs } from '@jlbyte/sys';

fs.folder('temp/ansi');
fs.copy('../ansi/package.json', 'temp/ansi/package.json', { overwrite: true });
fs.copy('../ansi/src', 'temp/ansi/src', { overwrite: true });
// Start

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
  assert.ok(fs.exists('./temp/ansi/dist/index.d.mts'))
  // console.log(cli.ctx);
});

await run();

// End
// fs.delete('temp');