import type from "../type/type.mjs";

function string_(input){
  if(type(input) === 'string') {   
    string_.core.value = input;
    return string_.core;
  }
  else {
    return String(input);
  }
}

string_.core = {
  value: undefined,
  extend: function(o) {
    for( var i in o ) this[i] = o[i];
    return this
  } 
};

export default string_;
