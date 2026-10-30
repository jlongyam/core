import { progress } from '@jlbyte/dialog';

const prog = progress({
  indicator: 'timer',  // Shows elapsed time instead of animated dots
  style: 'block',
  max: 50,
});

prog.start('Downloading');


// const prog = progress({
//   style: 'heavy',  // 'light', 'heavy', or 'block'
//   max: 100,        // Maximum value (default: 100)
//   size: 40,        // Width of the progress bar (default: 40)
// });

// prog.start('Processing files');

// Advance the progress bar
// prog.advance(10);  // Advance by 10 steps
// prog.advance(25, 'Processing images...');  // Advance with a message update

// Update just the message
// prog.message('Almost done...');

// Complete the progress
//prog.stop('All files processed');