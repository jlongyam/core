import object_ from "../core.mjs";
import type from "../../type/type.mjs";

object_.createEvents = function (obj) {
  if(type(obj) !== 'object') return;
  Object.defineProperty(obj, 'events', {
    value: {
      'create': [],
      'rename': [],
      'update': [],
      'delete': []
    },
    configurable: true
  })
};

export default object_;