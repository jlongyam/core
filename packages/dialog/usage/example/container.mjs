import { text, isCancel } from '@jlbyte/dialog';

const name = await text({
  message: "What is your name?",
  placeholder: "Jane Doe"
})