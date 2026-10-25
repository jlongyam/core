import env from '@jlbyte/env';
import '@jlbyte/env/global';

console.log(env.global === globalThis);
console.log(env.global === global);
