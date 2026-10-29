import { test, assert, run } from '@jlbyte/tester';
import { fs } from "../src/sys.mjs";


test("fs()", ()=> {
  assert.equal(fs(), process.cwd());
});
test("fs('../')", ()=> {
  assert.ok(!fs('../').includes('test'))
});
test("fs.exist()", ()=> {
  assert.ok(!fs.exists());
  assert.ok(fs.exists('../test'));
});
test("fs.file", ()=> {
  fs.file('text.txt', { content: 'CONTENT'});

  assert.ok(fs.exists('text.txt'));
});
test("fs.file.exists", ()=> {
  assert.ok(fs.file.exists('text.txt'));
  assert.ok(!fs.file.exists('other.txt'));
});
test("fs.file.read", ()=> {
  assert.equal(fs.file.read('text.txt'), 'CONTENT');
});
test("fs.file.append", ()=> {
  fs.file.append('text.txt', '_NEW');
  assert.equal(fs.file.read('text.txt'), 'CONTENT_NEW');
});
test("fs.file.create", async ()=> {
  await fs.file.create('a/new.txt', 'NEW');
  assert.equal(fs.file.read('a/new.txt'), 'NEW'); 
});
test("fs.isFile", ()=> {
  assert.ok(fs.isFile('text.txt'));
});
test("fs.isFolder", ()=> {
  assert.ok(fs.isFolder('a'));
});
test("fs.folder", ()=> {
  fs.folder('a-folder');
  assert.ok(fs.isFolder('a-folder'));
});
test("fs.folder.list", ()=> {
  let list = fs.folder.list();
  assert.ok(typeof list === 'object')
});
test("fs.copy", ()=> {
  fs.copy('a', 'b');
  assert.ok(fs.isFolder('b'));
});
test("fs.copy(overwrite)", ()=> {
  fs.file.append('b/new.txt', '_TEXT');
  fs.copy('b', 'a', { overwrite: true});
  assert.ok(fs.file.read('a/new.txt'), 'NEW_TEXT');
});
test("fs.delete", ()=> {
  fs.delete('b');
  assert.ok(!fs.exists('b'))
});
test("fs.download", async ()=> {
  await fs.download('https://cdn.truefilesize.com/zip/sample-1kb.zip');
  assert.ok(fs.exists('sample-1kb.zip'));
});
test("fs.extract", async ()=> {
  await fs.extract("sample-1kb.zip");
  assert.ok(fs.isFolder('sample-1kb'));
});
test("fs.file.delete", ()=> {
  let exists = fs.file.delete("a");
  assert.ok(!exists);
  fs.file.delete('a/new.txt');
  assert.ok(!fs.file.exists('a/new.txt'));
});
test("fs.folder.delete", ()=> {
  let exist = fs.folder.delete("b");
  assert.ok(!exist);
  fs.folder.delete('a');
  assert.ok(!fs.exists("a"))
});

await run();

{
  fs.delete("a-folder");
  fs.delete("sample-1kb");
  fs.delete("sample-1kb.zip");
  fs.delete("text.txt");
}