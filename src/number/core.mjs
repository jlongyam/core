import type from "../type/type.mjs";

function number_(input){
  if(type(input) === 'number') {   
    number_.core.value = input;
    return number_.core;
  }
  else {
    return String(input);
  }
}

number_.core = {
  value: undefined,
  extend: function(o) {
    for( var i in o ) this[i] = o[i];
    return this
  } 
};

export default number_;