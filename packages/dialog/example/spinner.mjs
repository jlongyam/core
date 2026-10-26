import { spinner, confirm, isCancel } from '@clack/prompts';

async function longRunningTask() {
  const shouldStart = await confirm({
    message: 'Start the long-running task?',
  });

  if (isCancel(shouldStart) || !shouldStart) {
    console.log('Task not started');
    return;
  }

  const spin = spinner({
    onCancel: () => {
      console.log('\nCleaning up resources...');
    },
    cancelMessage: 'Task was cancelled by user',
    errorMessage: 'Task failed unexpectedly',
  });

  spin.start('Processing data');

  try {
    // Simulate work in stages
    await new Promise(resolve => setTimeout(resolve, 1000));
    spin.message('Analyzing results');

    await new Promise(resolve => setTimeout(resolve, 1000));
    spin.message('Generating report');

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if cancelled during processing
    if (spin.isCancelled) {
      return;
    }

    spin.stop('Task completed successfully');
  } catch (error) {
    spin.error('An error occurred during processing');
  }
}

await longRunningTask()