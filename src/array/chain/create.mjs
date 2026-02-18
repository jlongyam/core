import array_ from "../core.mjs";
import type from "../../type/type.mjs";

array_.core.extend({
  create: function(val,pos) {
    if(pos || pos === 0) {    
      if( type(pos) === 'string') {
        if(pos === 'first') this.value.unshift(val)
        else if(pos === 'last') this.value.push(val)
        else return
      }
      else if( type(pos) === 'number') this.value.splice(pos,0,val)
      else return
    }
    else this.value.push(val)
    if(this.value['events']) {
      var events = this.value['events']['create'];
      if( events !== undefined && events.length > 0 ) {
        for( var i in events ) {
          events[i].call(false,val,pos);
        }
      }
    }
  }
});

export default array_;