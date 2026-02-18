import string_ from "../core.mjs";

string_.escapeQuote = function(str) {
  const map = { '"': '"', "'": '\\\'' }
  return str.replace( /"|'/g, function( m ) { return map[m] } )
}

export default string_;