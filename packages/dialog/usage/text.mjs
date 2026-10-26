import { text, isCancel } from "@jlbyte/dialog";

const name = await text({
  message: 'what is your name'
});

if(isCancel(name)) {
  process.exit(0);
}

console.log(name)