import { string_ } from "../../../dist/core.mjs";

var strHtml = `<h3>A heading 3</h3><ul style="color: blue"><li>list item 1</li><li>list item 2</li><li>list item 3</li></ul><p class="box"><button onclick="alert(9)">Click</button></p>`;
var pre1 = document.querySelector('#pre1');
var pre2 = document.querySelector('#pre2');

pre1.textContent = strHtml;
pre2.textContent = string_.formatHTML(strHtml);