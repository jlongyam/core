import { textStyle } from "@jlbyte/ansi/code";
import style from "@jlbyte/ansi/style";

for(let i in textStyle) {
  console.log(`style.${i}: ${style[i]('Text content')}`);
}
