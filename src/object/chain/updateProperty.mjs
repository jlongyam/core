import object_ from "../core.mjs";

object_.core.extend({
  updateProperty: function(key,value) {
    if( this.hasProperty(key) ) this.value[key] = value;
    if(this.value['events']) {
      var events = this.value['events']['update'];
      if(events !== undefined && events.length > 0 ) {
        for( var i in events ) {
          events[i].call(false,key,value);
        }
      }
    }
  }
});

export default object_;
