import { select, isCancel } from '@jlbyte/dialog';

const framework = await select({
  message: 'Choose a framework:',
  options: [
    { value: 'react', label: 'React', hint: 'A JavaScript library for building user interfaces' },
    { value: 'vue', label: 'Vue', hint: 'The Progressive JavaScript Framework' },
    { value: 'svelte', label: 'Svelte', hint: 'Cybernetically enhanced web apps' },
  ],
});

if (isCancel(framework)) {
  console.log('Operation cancelled');
  process.exit(0);
}

console.log(`You selected ${framework}`);