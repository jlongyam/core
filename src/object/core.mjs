import type from "../type/type.mjs";

function object_(input){
  if(type(input) === 'object') {   
    object_.core.value = input;
    return object_.core;
  }
  else {
    return String(input);
  }
}

object_.core = {
  value: undefined,
  extend: function(o) {
    for( var i in o ) this[i] = o[i];
    return this
  } 
};

export default object_;
