import env from '../env.mjs';

function useGlobal() {

}
const envGlobal = (()=> {
  if (typeof globalThis === 'object') return globalThis;
  else if (typeof global === 'object') return global;
  else if (typeof self === 'object') return self
  else if (typeof window === 'object') return window
  else return {}
})();

env.global = envGlobal;

export default env;
