import { isCancel, text } from '@clack/prompts';

const name = await text({
  message: 'What is this',
  placeholder: 'whatever',
  defaultValue: 'whatever'
});

if(isCancel(name)) {
  console.log('Canceled');
  process.exit(0)
}

console.log(name);
