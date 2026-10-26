import { select, isCancel } from '@clack/prompts';

// Mock function for demonstration
async function loadWebPrompts() {
  // This simulates loading web-specific prompts
  return {
    setupWebProject: async () => {
      // Implementation would go here
      return true;
    }
  };
}

async function setupProject() {
  const projectType = await select({
    message: 'Project type:',
    options: [
      { value: 'web', label: 'Web Application' },
      { value: 'cli', label: 'CLI Tool' },
    ],
  });

  if (isCancel(projectType)) {
    console.log('Operation cancelled');
    process.exit(0);
  }

  // Only load web-specific prompts if needed
  if (projectType === 'web') {
    const { setupWebProject } = await loadWebPrompts();
    await setupWebProject();
  }
}