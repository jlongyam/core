import { banner } from "../src/banner.mjs";

async function doStuff() {
  const text = await banner.text("Hello World!!");
  console.log(text);
}

doStuff();