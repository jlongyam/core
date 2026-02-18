import object_ from "../core.mjs";

object_.core.extend({
  renameProperty: function(from,to) {
    if(this.hasProperty(from) && !this.hasProperty(to) ) {
      for( var i in this.value ) {
        if(i === from) {
          this.value[to] = this.value[from];
          delete this.value[from];
        }
      }
      if(this.value['events']) {
        var events = this.value['events']['rename'];
        if( events !== undefined && events.length > 0 ) {
          for( var i in events ) {
            events[i].call(false,from,to);
          }
        }
      }
    }
  }
});

export default object_;
