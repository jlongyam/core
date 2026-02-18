import object_ from "../core.mjs";

object_.createEvents = function (obj) {
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