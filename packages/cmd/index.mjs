import sade from 'sade';

const cmd = sade('cli');

cmd.parse([1,2,'name','--','node'], {
  unknown: ''
});

