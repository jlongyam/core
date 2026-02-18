import { object_ } from "../../../dist/core.mjs";

var tpl = `
  <h2>{% this.h2 %}</h2>
  <p>{% this.p %}</p>
  <p>List</p>
  <ul>
    {% for( let i = 0; i < this.list.length; i++ ) {%}
    <li>{% this.list[i] %}</li>
    {%}%}
  </ul>
  <code>{% let x = 9; x + 1; %}</code>
`;

let innerHTML = object_({
  h2: 'Heading 2',
  p: 'Paragraph',
  list: [ 'one', 'two', 'three' ]
}).template(tpl);

document.body.innerHTML += innerHTML;

