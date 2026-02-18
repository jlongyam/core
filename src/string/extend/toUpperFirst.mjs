import string_ from "../core.mjs";

string_.toUpperFirst = function(str) {
  return str.substring( 0, 1 ).toUpperCase() + str.substring( 1 )
};

export default string_;