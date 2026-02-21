import { assert, test, type, string_ } from "../../dist/core.mjs";

const { it, run } = test;

it('string_.core', ()=> { assert.equal(type(string_.core), 'object') });
it('string_.core.value', ()=> { assert.equal(string_.core.value, undefined) });
it('string_.core.extend', ()=> { assert.equal(type(string_.core.extend), 'function') });
it('string_.escapeHtml', ()=> { assert.equal(type(string_.escapeHtml), 'function') });
it('string_.stripInitial', ()=> { assert.equal(type(string_.stripInitial), 'function') });
it('string_.escapeQuote', ()=> { assert.equal(type(string_.escapeQuote), 'function') });
it('string_.toUpperFirst', ()=> { assert.equal(type(string_.toUpperFirst), 'function') });
it('string_.urlEncode', ()=> { assert.equal(type(string_.urlEncode), 'function') });
it('string_.core.splice', ()=> { assert.equal(type(string_.core.splice), 'function') });

var str = {
  html: '<div>You &amp;</dive>',
  pre: `
    A
    B
  `,
  hi: 'Hello World',
  quote: "var str = 'Hello'",
  hello: "hello"
}

it("string_.escapeHtml(<string>[, <reverse>])", ()=> {
  assert.equal(string_.escapeHtml(str.html), '&lt;div&gt;You &amp;amp;&lt;/dive&gt;');
  assert.equal(string_.escapeHtml('&lt;div&gt;You &amp;amp;&lt;/dive&gt;', true), str.html);
});

it("string_.stripInitial(<string>)", ()=> {
  assert.equal(string_.stripInitial(str.pre).trim(), 'A\nB');
});

it("string_.escapeQuote(<string>)", ()=> {
  assert.equal(string_.escapeQuote(str.quote), `var str = \\'Hello\\'`);
});

it("string_.toUpperFirst(<string>)", ()=> {
  assert.equal(string_.toUpperFirst(str.hello), `Hello`);
});

it("string_.urlEncode(<string>[, <reverse>])", ()=> {
  assert.equal( string_.urlEncode("-_.!~*'()"), "-_.%21%7E%2A%27%28%29" );
  assert.equal( string_.urlEncode("-_.%21%7E%2A%27%28%29", true), "-_.!~*'()");
});

it("string_(<string>).splice(<pos>, <length>[, <replace>])", ()=> {
  assert.equal(string_(str.hi).splice(0, 5, 'Hi'), 'Hi World');
});

run();



