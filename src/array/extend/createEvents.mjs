import array_ from "../core.mjs";
import type from "../../type/type.mjs";

array_.createEvents = function (arr) {
  if(type(arr) !== 'array') return;
  Object.defineProperty(arr, 'events', {
    value: {
      'create': [],
      'update': [],
      'delete': []
    },
    configurable: true
  })
};

export default array_;