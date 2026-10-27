import spinner from '@jlbyte/ansi/spinner';

const loading = spinner({text: 'Loading ...'}).start();

setTimeout(() => {
	loading.success('Success!');
}, 2000);