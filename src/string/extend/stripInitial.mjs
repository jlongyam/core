import string_ from "../core.mjs";

string_.stripInitial = function (str) {
  var
    pttrn = /^\s*(?=[^\s]+)/mg,
    indentLen = str.match(pttrn).reduce(function (min, line) { return Math.min(min, line.length) }, Infinity),
    indent = new RegExp('^\\s{' + indentLen + '}', 'mg')
    ;
  return indentLen > 0 ? str.replace(indent, '') : str
}

export default string_;