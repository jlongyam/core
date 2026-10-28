import { code, style } from "@jlbyte/ansi";

for(let i in code.textStyle) {
  console.log(`style.${i}: ${style[i]('Text content')}`);
}
