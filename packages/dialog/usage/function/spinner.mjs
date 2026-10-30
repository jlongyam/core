import { spinner } from '@jlbyte/dialog';

const spin = spinner({
  onCancel: () => {
    console.log('User pressed Ctrl+C');
  }
});

spin.start('Long running task');

// ... after some work
if (spin.isCancelled) {
  // Handle cancellation
  
}