import object_ from "../core.mjs";

object_.core.extend({
  removeEventListener: function(name,fname) {
    if(!this.value['events'] || !name) return false;
    else {
      if(!fname && fname !== 0) {
        this.value['events'][name] = [];
      }
      else {
        var events = this.value['events'][name], i, a = [];
        if(fname === 0 || typeof fname === 'number') {
          for( i in events ) {
            if(fname === parseInt(i)) continue;
            a.push(events[i]);
          }
          this.value['events'][name] = a;
        }
        if(typeof fname === 'string') {
          for( var i in events ) {
            if(events[i].name === fname) continue;
            a.push(events[i]);
          }
          this.value['events'][name] = a;
        }
      }
    }
  }
});

export default object_;