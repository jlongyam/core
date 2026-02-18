import object_ from "../core.mjs";

object_.core.extend({
  hasProperty: function(search) {
    var bool = false;
    search = search.toString();
    for( var i in this.value ) {
      if( i === search ) {
        bool = true;
        break;
      }
    }
    return bool;
  }
});

export default object_;
