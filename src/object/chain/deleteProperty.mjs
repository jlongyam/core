import object_ from "../core.mjs";

object_.core.extend({
  deleteProperty: function(key) {
    if( this.hasProperty(key) ) delete this.value[key];
    if( this.value['events']) {
      var events = this.value['events']['delete'];
      if( events !== undefined && events.length > 0 ) {
        for( var i in events ) {
          events[i].call(false,key);
        }
      }
    }
  }
});

export default object_;
