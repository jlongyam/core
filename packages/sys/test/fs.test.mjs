import { test, assert, run } from '@jlbyte/tester';
import { fs } from "../src/sys.mjs";

test("fs()", ()=> {
  assert.equal(fs(), process.cwd());
});
test("fs('../')", ()=> {
  let up = fs('../');
  assert.ok(Array.isArray(up))
  assert.ok(up.includes('test'));
});
test("fs.exist()", ()=> {
  assert.ok(!fs.exists());
  assert.ok(fs.exists('test'));
  assert.ok(fs.exists('test/fs.test.mjs'));
});
test("fs.isFile", ()=> {
  assert.ok(fs.isFile('test/fs.test.mjs'));
});
test("fs.isFolder", ()=> {
  assert.ok(fs.isFolder('test'));
});
test("fs.folder", ()=> {
  fs.folder('./temp');
  assert.ok(fs.isFolder('./temp'));
});
test("fs.folder.create", ()=> {
  fs.folder.create('./temp/folder');
  assert.ok(fs.isFolder('./temp/folder'));
});
test("fs.folder.list", ()=> {
  assert.deepEqual(fs.folder.list(), []);
  assert.ok(fs.folder.list('./').includes('temp'));
});
test("fs.file", ()=> {
  fs.file('./temp/new/text.txt', 'CONTENT');
  assert.ok(fs.exists('./temp/new/text.txt'));
});
test("fs.file.exists", ()=> {
  assert.ok(fs.file.exists('./temp/new/text.txt'));
  assert.ok(!fs.file.exists('./other.txt'));
});
test("fs.file.read", ()=> {
  assert.equal(fs.file.read('./temp/new/text.txt'), 'CONTENT');
});
test("fs.file.append", ()=> {
  fs.file.append('./temp/new/text.txt', '_NEW');
  assert.equal(fs.file.read('./temp/new/text.txt'), 'CONTENT_NEW');
});
test("fs.file.create", ()=> {
  fs.file.create('./temp/new/other.txt', 'NEW');
  assert.equal(fs.file.read('./temp/new/other.txt'), 'NEW'); 
});
test("fs.file.delete", ()=> {
  let exists = fs.file.delete("./temp/any");
  assert.ok(!exists);
  fs.file.delete('./temp/new/other.txt');
  assert.ok(!fs.file.exists('./temp/new/other.txt'));
});
test("fs.folder.delete", ()=> {
  let exist = fs.folder.delete("./temp/other");
  assert.ok(!exist);
  fs.folder.delete('./temp/folder');
  assert.ok(!fs.exists("./temp/folder"));
});
test('fs.file.copy', ()=> {
  fs.file.copy('./temp/new/text.txt', './temp/backup/new.txt');
  assert.ok(fs.file.exists('./temp/backup/new.txt'));
});
test('fs.folder.copy', ()=> {
  fs.folder.copy('./temp/new', './temp/other');
  assert.ok(fs.folder.exists('./temp/other'));
});
test("fs.copy", ()=> {
  fs.copy('./temp/other', './temp/any');
  assert.ok(fs.isFolder('./temp/other'));
});


test("fs.file.download", ()=> {
  fs.file.download('https://cdn.truefilesize.com/zip/sample-1kb.zip');
  assert.ok(fs.exists('./sample-1kb.zip'));
});
test("fs.file.extract", async ()=> {
  fs.file.extract("./sample-1kb.zip");
  assert.ok(fs.isFolder('./sample-1kb'));
});

await run();

{
  fs.delete('./temp');
  fs.delete("./sample-1kb");
  fs.delete("./sample-1kb.zip");
}