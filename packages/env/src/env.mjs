import { parse as bowserParse } from "bowser";

const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
const isWorker = typeof importScripts !== "undefined" || (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope);
const isCLI = !isBrowser && !isWorker;

const env = {
  browser: isBrowser,
  worker: isWorker,
  cli: isCLI
};

const envGlobal = (()=> {
  if (typeof globalThis === 'object') return globalThis;
  else if (typeof global === 'object') return global;
  else if (typeof self === 'object') return self
  else if (typeof window === 'object') return window
  else return {}
})();

env.global = envGlobal;

if(env.worker) {
  const envWorker = () => {
    if (typeof WorkerGlobalScope !== 'undefined' && globalThis instanceof WorkerGlobalScope) return 'webWorker';
    if (typeof ServiceWorkerGlobalScope === 'function' && env.global instanceof ServiceWorkerGlobalScope) return 'serviceWorker';
    if (typeof SharedWorkerGlobalScope === 'function' && g instanceof SharedWorkerGlobalScope) return 'sharedWorker';
    if (typeof DedicatedWorkerGlobalScope === 'function' && g instanceof DedicatedWorkerGlobalScope) return 'dedicatedWorker';
    return 'unknown';
  };
  env.worker = envWorker();
}
if(env.cli) {
  const envRuntime = () => {
    if (typeof Deno !== 'undefined' && Deno?.version?.deno) return 'deno';
    if (typeof Bun !== 'undefined' && Bun?.version) return 'bun';
    if (typeof process !== 'undefined' && process.versions?.node) return 'node';
    return 'unknown';
  };
  env.runtime = envRuntime();
  
  env.tty = env.runtime === 'deno' ? Deno.stdout.isTerminal() : Boolean(process.stdout.isTTY);
  
  const envVDom = ()=> {
    if(typeof window !== 'undefined' && window.happyDOM !== undefined) return 'happyDOM';
    if(env.global.navigator?.userAgent?.includes('jsdom') === true) return 'JSDom'
    return false;
  }
  env.vdom = envVDom();
  
  const envOS = ()=> {
    if((env.runtime === 'node') || (env.runtime === 'bun')) {
      if(process.platform === 'win32') return 'windows'
      else return process.platform;
    }
    if(env.runtime === 'deno') return build.os;
  }
  env.OS = envOS();
  
  const envArch = ()=> {
    if((env.runtime === 'node') || (env.runtime === 'bun')) {
      if (process.arch === "x64") return 'amd64';
      else return process.arch;
    }
    if(env.runtime === 'deno') {
      if(deno.build.arch === 'x86_64') return 'amd64';
      if(deno.build.arch === 'aarch64') return 'arm64';
    }
  }
  env.arch = envArch();
  env.bit = ["amd64", "arm64", "ppc64", "s390x"].includes(env.arch) ? '64' : '32';
  env.home = env.OS === 'windows' ? 'USERPROFILE': 'HOME';
  env.user = env.OS === 'windows' ? 'USERNAME': 'USER';
  env.tmp = env.OS === 'windows' ? 'TEMP': 'TMPDIR';
}
if(env.browser) {
  const envHybrid = ()=> {
    if(env.global.process?.versions?.electron !== undefined) return 'electron';
    if(typeof process !== 'undefined' && process.versions?.nw) return 'nwjs';
    if(window.__TAURI__ || window.__TAURI_METADATA__) return 'tauri';
    if(window.Capacitor) return 'capacitor';
    if(window.cordova) return 'cordova';
    if(window.ReactNativeWebView != null || navigator.product === 'ReactNative') return 'reactNative';
    return false;
  }
  env.hybrid = envHybrid();

  const parsed = bowserParse(navigator.userAgent);
  env.browser = parsed.browser;
  Object.assign(env.browser, {
    os: parsed.os,
    platform: parsed.platform,
    engine: parsed.engine
  });

  const envCloud = ()=> {
    if(env.global.navigator.userAgent.includes('Cloudflare-Workers')) return 'cloudFlare';
    return false;
  }
  env.cloud = envCloud();
}

export default env;