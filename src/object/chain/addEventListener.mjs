import object_ from "../core.mjs";

object_.core.extend({
  addEventListener: function(name, cb) {
    if(!cb || !this.value['events']) return;
    this.value['events'][name].push(cb)
  }
});

export default object_;