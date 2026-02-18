import object_ from "../core.mjs";

function fromString(obj, path) {
  return path.split('.').reduce(function(o, prop) {
    return o && o.hasOwnProperty(prop) ? o[prop] : undefined;
  }, obj)
}

object_.core.extend({
  select: function(str) {
    return fromString(this.value, str)
  }
});

export default object_;
