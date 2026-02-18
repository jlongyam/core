import array_ from "../core.mjs";
import object_ from "../../object/chain/forEach.mjs";

array_.core.extend({
  forEach: object_.core.forEach
});

export default array_;