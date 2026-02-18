import object_ from "../core.mjs";

object_.core.extend({
  forEach: function( cb ) {
    if( typeof cb !== 'function' ) return;
    for( let i in this.value ) cb(i, this.value[i])
  }
});

export default object_;
