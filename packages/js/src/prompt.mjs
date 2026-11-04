import { isCancel, log, select, text, groupMultiselect } from '@jlbyte/dialog';
import build from './build.mjs';

async function Init() {
  const action = await select({
    message: 'Do:',
    options: [
      { value: 'build', label: 'Build', hint: 'Bundle scripts for production' },
      { value: 'transpile', label: 'Transpile', hint: 'Transpile esm for legacy' }
    ]
  });
  if(isCancel(action)) {
    console.log('Init canceled');
    process.exit(0);
  }
  return action;
}
async function selectInput() {
  const action = await text({
    message: 'Input:',
    placeholder: './src/index.mjs',
    validate: (value) => {
      if(!(value.endsWith('.js') || value.endsWith('.mjs'))) {
        return 'Input should .js or .mjs';
      }
      return undefined;
    }
  });
  if(isCancel(action)) {
    console.log('selectInput canceled');
    process.exit(0);
  }
  return action;
}
async function selectOutput() {
  const action = await text({
    message: 'Output:',
    placeholder: './dist',
    validate: (value) => {
      if(value.endsWith('.js') || value.endsWith('.mjs') ||  value.endsWith('.cjs') ) {
        return 'Input should folder';
      }
      return false;
    }
  });
  if(isCancel(action)) {
    console.log('selectOutput canceled');
    process.exit(0);
  }
  return action;
}
async function inputFormat() {
  const action = await groupMultiselect({
    message: 'Output format:',
    options: {
      'All': [
        { value: 'es', label: 'mjs', hint: 'Ecmascript (default)' },
        { value: 'cjs', label: 'cjs', hint: 'CommonJS (default)' },
        { value: 'iife', label: 'js', hint: 'IIFE' }
      ]
    }
  });
  if(isCancel(action)) {
    console.log('inputFormat canceled');
    process.exit(0);
  }
  return action;
}
async function inputName() {
  const action = await text({
    message: 'Name:',
    placeholder: 'index  (optional)'
  });
  if(isCancel(action)) {
    console.log('inputName canceled');
    process.exit(0);
  }
  return action;
}
async function inputExclude() {
  const action = await text({
    message: 'Exclude:',
    placeholder: '@scope/name  (optional, comma separated)'
  });
  if(isCancel(action)) {
    console.log('inputExclude canceled');
    process.exit(0);
  }
  return action;
}
async function inputAsset() {
  const action = await text({
    message: 'Asset:',
    placeholder: './src/style.css  (optional, comma separated)'
  });
  if(isCancel(action)) {
    console.log('inputAsset canceled');
    process.exit(0);
  }
  return action;
}
async function inputPackage() {
  const action = await text({
    message: 'Package:',
    placeholder: './package.json (optional)'
  });
  if(isCancel(action)) {
    console.log('inputPackage canceled');
    process.exit(0);
  }
  return action;
}
const init = await Init();
if( init === 'build') {
  try {
    const input = await selectInput();
    const output = await selectOutput();
    const format = await inputFormat();
    const name = await inputName();
    const exclude = await inputExclude();
    const asset = await inputAsset();
    const packages_json = await inputPackage();

    let options = {
      format: format.join(','),
      name: name || false,
      exclude: exclude || false,
      asset: asset || false,
      package: packages_json || false
    }
    // console.log(input, output, options);
    log.info('Build ...');
    await build(input, output, options);
  }
  catch(e) {
    console.error(e.message);
  }
}
else {
  log.warn(`"${init}" Not implemented, Sorry`);
  process.exit(0);
}
