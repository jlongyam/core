import array_ from "../core.mjs";

array_.core.extend({
  delete: function(val, pos) {
    if(val||val === 0) {
      var l = this.value.length, i;
      if(pos || pos === 0) {    
        for( i = 0; i < l; i++ ) {
          if(i === pos && this.value[i] === val) this.value.splice(i,1)
        }
      }
      else {
        for( i = 0; i < l; i++ ) {
          if(this.value[i] === val ) this.value.splice(i,1)
        }
      }
      if(this.value['events']) {
        var events = this.value['events']['delete'];
        if( events !== undefined &&  events.length > 0 ) {
          for( i in events ) {
            events[i].call(false,val,pos);
          }
        }
      }
    }
    else {
      var l = this.value.length, i;
      if(pos || pos === 0) {    
        for( i = 0; i < l; i++ ) {
          if(i === pos) this.value.splice(i,1)
        }
      }
      else {
        for( i = 0; i < l; i++ ) {
          this.value.splice(i,1)
        }
      }
    }
  }
});

export default array_;