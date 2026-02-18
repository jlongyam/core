import array_ from "../core.mjs";
import object_ from "../../object/chain/removeEventListener.mjs";

array_.core.extend({
  removeEventListener: object_.core.removeEventListener
});

export default array_;