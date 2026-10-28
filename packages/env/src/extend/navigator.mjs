const platform = globalThis.navigator?.userAgentData?.platform;
const isMacOs = platform === 'macOS'
	|| globalThis.navigator?.platform === 'MacIntel' // Even on Apple silicon Macs.
	|| globalThis.navigator?.userAgent?.includes(' Mac ') === true
	|| globalThis.process?.platform === 'darwin';
const isWindows = platform === 'Windows'
	|| globalThis.navigator?.platform === 'Win32'
	|| globalThis.process?.platform === 'win32';
const isLinux = platform === 'Linux'
	|| globalThis.navigator?.platform?.startsWith('Linux') === true
	|| globalThis.navigator?.userAgent?.includes(' Linux ') === true
	|| globalThis.process?.platform === 'linux';
const isIos = platform === 'iOS'
	|| (globalThis.navigator?.platform === 'MacIntel' && globalThis.navigator?.maxTouchPoints > 1)
	|| /iPad|iPhone|iPod/.test(globalThis.navigator?.platform);
const isAndroid = platform === 'Android'
	|| globalThis.navigator?.platform === 'Android'
	|| globalThis.navigator?.userAgent?.includes(' Android ') === true
	|| globalThis.process?.platform === 'android';