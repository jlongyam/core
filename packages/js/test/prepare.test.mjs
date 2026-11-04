import { fs } from '@jlbyte/sys';
import { assert, test, run } from '@jlbyte/tester';

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

test('prepare: env', async()=> {
  fs.folder('./temp/env');
  fs.copy('../env/package.json', './temp/env/package.json', { overwrite: true });
  fs.copy('../env/src', './temp/env/src', { overwrite: true });
  fs.delete('./temp/env/dist');

  assert.ok(fs.exists('./temp/env'));
  assert.ok(fs.exists('./temp/env/package.json'));
  assert.ok(fs.exists('./temp/env/src'));
  assert.ok(!fs.exists('./temp/env/dist'));
});

test('prepare: tester', async()=> {
  fs.folder('./temp/tester');
  fs.copy('../tester/package.json', './temp/tester/package.json', { overwrite: true });
  fs.copy('../tester/src', './temp/tester/src', { overwrite: true });
  fs.delete('./temp/tester/dist');

  assert.ok(fs.exists('./temp/tester'));
  assert.ok(fs.exists('./temp/tester/package.json'));
  assert.ok(fs.exists('./temp/tester/src'));
  assert.ok(!fs.exists('./temp/tester/dist'));
});

test('prepare: cmd', async()=> {
  fs.folder('./temp/cmd');
  fs.copy('../cmd/package.json', './temp/cmd/package.json', { overwrite: true });
  fs.copy('../cmd/src', './temp/cmd/src', { overwrite: true });
  fs.delete('./temp/cmd/dist');

  assert.ok(fs.exists('./temp/cmd'));
  assert.ok(fs.exists('./temp/cmd/package.json'));
  assert.ok(fs.exists('./temp/cmd/src'));
  assert.ok(!fs.exists('./temp/cmd/dist'));
});

test('prepare: sys', async()=> {
  fs.folder('./temp/sys');
  fs.copy('../sys/package.json', './temp/sys/package.json', { overwrite: true });
  fs.copy('../sys/src', './temp/sys/src', { overwrite: true });
  fs.delete('./temp/sys/dist');

  assert.ok(fs.exists('./temp/sys'));
  assert.ok(fs.exists('./temp/sys/package.json'));
  assert.ok(fs.exists('./temp/sys/src'));
  assert.ok(!fs.exists('./temp/sys/dist'));
});

test('prepare: dialog', async()=> {
  fs.folder('./temp/dialog');
  fs.copy('../dialog/package.json', './temp/dialog/package.json', { overwrite: true });
  fs.copy('../dialog/src', './temp/dialog/src', { overwrite: true });
  fs.delete('./temp/dialog/dist');

  assert.ok(fs.exists('./temp/dialog'));
  assert.ok(fs.exists('./temp/dialog/package.json'));
  assert.ok(fs.exists('./temp/dialog/src'));
  assert.ok(!fs.exists('./temp/dialog/dist'));
});

await run();