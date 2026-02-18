import array_ from "../core.mjs";

array_.core.extend({
  update: function(from,to,pos) {
    if((from||from === 0) && (to||to === 0)) {
      var l = this.value.length, i;
      if(pos||pos === 0) {
        for( i = 0; i < l; i++ ) {
          if(i === pos && this.value[i] === from ) this.value[i] = to
        }
      }
      else {
        for( i = 0; i < l; i++ ) {
          if(this.value[i] === from ) this.value[i] = to
        }
      }
      if(this.value['events']) {
        var events = this.value['events']['update']
        if( events!== undefined && events.length > 0 ) {
          for( i in events ) {
            events[i].call(false,from,to,pos);
          }
        }
      }
    }
    else return
  }
});

export default array_;