import { assert, test, type, array_ } from "../../dist/core.mjs";

const { it, run } = test;

it('array_.core', ()=> { assert.equal(type(array_.core), 'object') });
it('array_.core.value', ()=> { assert.equal(array_.core.value, undefined) });
it('array_.core.extend', ()=> { assert.equal(type(array_.core.extend), 'function') });
it('array_.createEvents', ()=> { assert.equal(type(array_.createEvents), 'function') });
it('array_.core.forEach', ()=> { assert.equal(type(array_.core.forEach), 'function') });
it('array_.core.addEventListener', ()=> { assert.equal(type(array_.core.addEventListener), 'function') });
it('array_.core.removeEventListener', ()=> { assert.equal(type(array_.core.removeEventListener), 'function') });
it('array_.core.create', ()=> { assert.equal(type(array_.core.create), 'function') });
it('array_.core.update', ()=> { assert.equal(type(array_.core.update), 'function') });
it('array_.core.delete', ()=> { assert.equal(type(array_.core.delete), 'function') });

var arr = [1,'a',function(){}];

it("array_.createEvents(<array>)", ()=> {
  array_.createEvents(arr);
  assert.equal(arr.length, 3);
  assert.ok(Object.getOwnPropertyNames(arr).includes('events'));
  assert.deepEqual(Object.getOwnPropertyNames(arr.events), [ 'create', 'update', 'delete' ]);
});

it("array_(<array>).forEach((<key>,<value>)", ()=> {
  var has_function = false;
  array_(arr).forEach((k,v)=> {
    if(type(v) === 'function') has_function = true
    return;
  })
  assert.ok(has_function);
});

it("array_(<array>).addEventListener(<name>, <cb>)", ()=> {
  array_(arr).addEventListener('create', function() {});
  assert.equal(type(arr.events.create), 'array');
  assert.equal(type(arr.events.create[0]), 'function');
});

it("array_(<array>).removeEventListener(<name>[, <fname>])", ()=> {
  array_(arr).removeEventListener('create')
  assert.equal(arr.events.create.length, 0);
});

it("array_(<array>).create(<value>[, <pos>])", ()=> {
  array_(arr).create('foo');
  assert.equal(arr[arr.length-1], 'foo');
  array_(arr).create('bar', 'first');
  assert.equal(arr[0], 'bar');
  array_(arr).create('baz', 'last');
  assert.equal(arr[arr.length-1], 'baz');
  array_(arr).create('a', 0);
  assert.equal(arr[0], 'a');
  array_(arr).create('b', 3);
  assert.equal(arr[3], 'b');
  array_(arr).addEventListener('create', (value, pos)=> {
    assert.equal(value, 'qux');
    assert.equal(pos, 5);
  });
  array_(arr).create('qux', 5);
  assert.equal(arr[5], 'qux');
});

it("array_(<array>).create(<from>, <to>[, <pos>])", ()=> {
  array_(arr).update('a', 0, 0);
  assert.equal(arr[0], 0);
  array_(arr).update('a','zero');
  assert.ok(arr.includes('zero'));
  array_(arr).addEventListener('update', (from, to) => {
    assert.equal(from, 'b');
    assert.equal(to, 'c');
  });
  array_(arr).update('b', 'c');
  array_(arr).removeEventListener('update');
  array_(arr).addEventListener('update', (from, to, pos)=> {
    assert.equal(from, 'baz');
    assert.equal(to, 'bar');
    assert.equal(pos, arr.length-1);
  });
  array_(arr).update('baz', 'bar', arr.length-1)
  assert.equal(arr[arr.length-1], 'bar');
});

it("array_(<array>).delete(<value>[, <pos>])", ()=> {
  array_(arr).delete(0);
  assert.equal(arr[0], 'bar');
  array_(arr).addEventListener('delete', (value, pos) => {
    assert.equal(value, null);
    assert.equal(pos, 5)
  })
  array_(arr).delete(null,5);
});

run();



