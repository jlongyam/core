import { text, select, confirm, isCancel } from '@clack/prompts';

async function main() {
  const name = await text({
    message: 'What is your name',
    placeholder: 'jhon',
    defaultValue: 'anonymous'
  });
  if(isCancel(name)) {
    console.log('Input name canceled');
    process.exit(0);
  }
  const framework = await select({
    message: 'Choose a framework',
    options: [
      { value: 'react', label: 'React', hint: 'A JavaScript library for building user interfaces' },
      { value: 'vue', label: 'Vue', hint: 'The Progressive JavaScript Framework' },
      { value: 'svelte', label: 'Svelte', hint: 'Cybernetically enhanced web apps' }
    ]
  });
  if(isCancel(framework)) {
    console.log('Choosing framework canceled');
    process.exit(0);
  }
  const proceed = await confirm({
    message: `Create ${framework} by ${name}`
  });
  if(isCancel(proceed)) {
    console.log('Proceed canceled');
    process.exit(0);
  } 
  else if(proceed) {
    console.log('Creating project')
  }
}

main();