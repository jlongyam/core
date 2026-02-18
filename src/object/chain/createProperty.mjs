import object_ from "../core.mjs";

object_.core.extend({
  createProperty: function (key, val) {
    if (!this.hasProperty(key)) {
      this.value[key] = val;
      if (this.value['events']) {
        var events = this.value['events']['create'];
        if ( events !== undefined && events.length > 0) {
          for (var i in events) {
            events[i].call(false, key, val);
          }
        }
      }
    }
  }
});

export default object_;
