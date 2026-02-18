import object_ from "../core.mjs";
import type from "../../type/type.mjs";

function getAllProperties(obj) {
  const props = new Set();
  let current = obj;
  while (current) {
    Object.getOwnPropertyNames(current).forEach(prop => props.add(prop));
    current = Object.getPrototypeOf(current);
  }
  return Array.from(props);
}

object_.expose = function (obj) {
  let arr = getAllProperties(obj);
  let methods = [];
  let properties = [];
  for(let i in arr) {
    if(type(obj[arr[i]]) === 'function') methods.push(arr[i]);
    else properties.push(arr[i]);
  }
  return {
    methods: methods,
    properties: properties
  }
} 

export default object_;