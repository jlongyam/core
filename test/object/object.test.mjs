import { assert, test, type, object_ } from "../../dist/core.mjs";

const { it, run } = test;


it('object_.core', ()=> { assert.equal(type(object_.core), 'object') });
it('object_.core.value', ()=> { assert.equal(object_.core.value, undefined) });
it('object_.core.extend', ()=> { assert.equal(type(object_.core.extend), 'function') });
it('object_.expose', ()=> { assert.equal(type(object_.expose), 'function') });
it('object_.createEvents', ()=> { assert.equal(type(object_.createEvents), 'function') });
it('object_.core.select', ()=> { assert.equal(type(object_.core.select), 'function') });
it('object_.core.forEach', ()=> { assert.equal(type(object_.core.forEach), 'function') });
it('object_.core.hasProperty', ()=> { assert.equal(type(object_.core.hasProperty), 'function') });
it('object_.core.addEventListener', ()=> { assert.equal(type(object_.core.addEventListener), 'function') });
it('object_.core.getEventListener', ()=> { assert.equal(type(object_.core.getEventListener), 'function') });
it('object_.core.removeEventListener', ()=> { assert.equal(type(object_.core.removeEventListener), 'function') });
it('object_.core.createProperty', ()=> { assert.equal(type(object_.core.createProperty), 'function') });
it('object_.core.renameProperty', ()=> { assert.equal(type(object_.core.renameProperty), 'function') });
it('object_.core.updateProperty', ()=> { assert.equal(type(object_.core.updateProperty), 'function') });
it('object_.core.deleteProperty', ()=> { assert.equal(type(object_.core.deleteProperty), 'function') });

let obj = {
  one: 'One',
  two: { a: 'Two-A', b: 'Two-B' },
  three: ()=> 'Three'
};
let o = {};
let evt = {};

it("object.expose(<object>)", ()=> {
  let _o = object_.expose(obj);
  assert.equal(type(_o.methods), 'array');
  assert.equal(type(_o.properties), 'array');
});

it("object.createEvents(<object>)", ()=> {
  object_.createEvents(obj);
  assert(Object.keys(obj).length === 3);
  assert.ok(Object.getOwnPropertyNames(obj).includes('events'));
  assert.deepEqual(Object.getOwnPropertyNames(obj.events), [ 'create', 'rename', 'update', 'delete' ]);
})

it("object_(<object>).select(<string>)", ()=> {
  assert.equal(object_(obj).select('two.b'), 'Two-B');
});

it("object_(<object>).forEach((<key>,<value>))", ()=> {
  object_(obj.two).forEach( (k,v)=> o[k] = v );
  assert.deepEqual(o, obj.two);
});

it("object_(<object>).hasProperty(<string>)", ()=> {
  assert.ok(!object_(obj).hasProperty('events'));
  assert.ok(object_(obj).hasProperty('three'));
});

it("object_(<object>).addEventListener(<name>, <cb>)", ()=> {
  object_(evt).addEventListener('create', function() {});
  assert.ok(!Object.getOwnPropertyNames(evt).includes('events'));
  object_.createEvents(evt);
  assert.ok(Object.getOwnPropertyNames(evt).includes('events'));
  object_(evt).addEventListener('create', function() {});
  assert.equal(type(evt.events.create), 'array');
  assert.equal(type(evt.events.create[0]), 'function');
});

it("object_(<object>).getEventListener(<name>[, <fname>])", ()=> {
  assert.equal( type(object_(evt).getEventListener('create')), 'array' );
  assert.equal( type(object_(evt).getEventListener('create')[0]), 'function' );
  object_(evt).addEventListener('create', function bar() {})
  assert.equal( object_(evt).getEventListener('create')[1]['name'], 'bar' );
});

it("object_(<object>).removeEventListener(<name>[, <fname>])", ()=> {
  object_(evt).removeEventListener('create', 0);
  assert.equal(object_(evt).getEventListener('create').length, 1);
  object_(evt).removeEventListener('create', 'bar');
  assert.equal(object_(evt).getEventListener('create').length, 0);
});

it("object_(<object>).createProperty(<string>, <value>)", ()=> {
  object_(evt).createProperty('one', 'ONE');
  assert.equal(evt.one, 'ONE');
  object_(evt).addEventListener('create', (key, val)=> {
    assert.equal(key, 'two');
    assert.equal(val, 'TWO');
  });
  object_(evt).createProperty('two', 'TWO');
});

it("object_(<object>).renameProperty(<from>, <to>)", ()=> {
  object_(evt).renameProperty('two', 'three');
  assert.equal(evt.three, 'TWO');
  object_(evt).addEventListener('rename', (from, to) => {
    assert.equal(from, 'one');
    assert.equal(to, 'two');
  });
  object_(evt).renameProperty('one', 'two');
});

it("object_(<object>).updateProperty(<key>, <value>)", ()=> {
  object_(evt).updateProperty('three', 'THREE');
  assert.equal(evt.three, 'THREE');
  object_(evt).addEventListener('update', (key, value) => {
    assert.equal(key, 'two');
    assert.equal(value, 'TWO');
  });
  object_(evt).updateProperty('two', 'TWO');
});

it("object_(<object>).deleteProperty(<key>)", ()=> {
  object_(evt).deleteProperty('three');
  assert.equal(evt.three, undefined);
  object_(evt).addEventListener('delete', (key) => {
    assert.equal(key, 'two');
  });
  object_(evt).deleteProperty('two');
});

run();



