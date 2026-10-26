import { autocomplete, isCancel } from "@clack/prompts";

const selectPackage = await autocomplete({
  message: 'Search for package',
  options: [
    { value: 'astro', label: 'Astro', hint: 'The web framework for content-based sites' },
    { value: 'react', label: 'React', hint: 'A JavaScript library for building user interfaces' },
    { value: 'vue', label: 'Vue', hint: 'The Progressive JavaScript Framework' },
    { value: 'svelte', label: 'Svelte', hint: 'Cybernetically enhanced web apps' },
    { value: 'angular', label: 'Angular', hint: 'Platform for building mobile & desktop web apps' },
  ],
  placeholder: 'Type to search...',
  maxItems: 5
});

if(isCancel(selectPackage)) {
  console.log('Select package canceled');
  process.exit(0);
}

console.log(`Selected package: ${selectPackage}`)