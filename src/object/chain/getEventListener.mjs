import object_ from "../core.mjs";

object_.core.extend({
  getEventListener: function(name,fname) {
    if(!this.value['events'] || !name) return undefined;
    else {
      var names = this.value['events'][name];
      var result = [];
      if(!fname) {
        for( var i in names ) {
          result.push(names[i]);
        }
        return result;
      }
      else {
        var n = -1;
        for( var i in names ) {
          if(names[i].name === fname) {
            n = i;
            break;
          }
        }
        return n;
      }
    }
  }
});

export default object_;