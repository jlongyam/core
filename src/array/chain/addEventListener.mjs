import array_ from "../core.mjs";
import object_ from "../../object/chain/addEventListener.mjs";

array_.core.extend({
  addEventListener: object_.core.addEventListener
});

export default array_;