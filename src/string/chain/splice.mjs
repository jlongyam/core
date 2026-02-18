import string_ from "../core.mjs";

string_.core.extend({
  splice: function (pos, length, replace) {
    length = +length || 0;
    replace = replace || '';
    return this.value.slice(0, pos) + replace + this.value.slice(pos + length)
  }
});

export default string_;