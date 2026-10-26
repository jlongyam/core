import { autocomplete, isCancel } from '@clack/prompts';

async function pickBranch() {
  const branch = await autocomplete({
    message: 'Check out a branch:',
    completeOnTab: true,
    options: [
      { value: 'main', label: 'main' },
      { value: 'feat/accessible-mode', label: 'feat/accessible-mode' },
      { value: 'fix/path-completion', label: 'fix/path-completion' },
    ],
  });

  if (isCancel(branch)) {
    process.exit(0)
    return null;
  }
  return branch;
}

pickBranch()