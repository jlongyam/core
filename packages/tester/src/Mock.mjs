class Mock {
  console() {
    const original = {
      log: console.log,
      error: console.error
    };
    const output = {
      stdout: [],
      stderr: []
    };
    console.log = (...args) => {
      output.stdout.push(args.join(' '));
    };
    console.error = (...args) => {
      output.stderr.push(args.join(' '));
    };
    return {
      restore: () => {
        console.log = original.log;
        console.error = original.error;
      },
      getOutput: () => output
    };
  }
  exit() {
    const original = process.exit;
    let exitCode = null;
    let exitCalled = false;
    
    process.exit = (code = 0) => {
      exitCode = code;
      exitCalled = true;
    };
    
    return {
      restore: () => {
        process.exit = original;
      },
      getExitCode: () => exitCode,
      wasExitCalled: () => exitCalled
    };
  }
}

export default Mock;