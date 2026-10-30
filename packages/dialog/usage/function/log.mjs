import { log } from '@jlbyte/dialog';

log.message('Entering directory "src"');
log.info('No files to update');
log.warn('Directory is empty, skipping');
log.warning('Directory is empty, skipping');
log.error('Permission denied on file src/secret.js');
log.success('Installation complete');
log.step('Check files');
//
log.info('Info', { withGuide: false});
log.success('Success', { withGuide: false});
