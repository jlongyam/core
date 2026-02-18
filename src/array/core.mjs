import type from "../type/type.mjs";

function array_(input){
  if(type(input) === 'array') {   
    array_.core.value = input;
    return array_.core;
  }
  else {
    return String(input);
  }
}

array_.core = {
  value: undefined,
  extend: function(o) {
    for( var i in o ) this[i] = o[i];
    return this
  } 
};

export default array_;