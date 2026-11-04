import { fs, exec } from '@jlbyte/sys';
import path from 'path';

async function build(input, output, options = {}) {
  if(!fs.file.exists(input)) {
    console.error('file not exists');
    process.exit(0);
  };
  let option = {
    format: options.format ? options.format.split(',') : ['es','cjs'],
    name: options.name ? options.name : path.parse(input)['name'],
    exclude: options.exclude ? options.exclude : false,
    package: options.package ? options.package : false,
    asset: options.asset ? options.asset : false
  };
  // rollup
  for (let i in option.format) {
    let cmds = ['npx', 'rollup'];
    cmds.push(`--input.${option.name}=${input}`);
    cmds.push('--dir', output);
    cmds.push('--format', option.format[i]);
    cmds.push('-p', 'commonjs,node-resolve,@rollup-extras/plugin-strip-comments,rollup-plugin-cleanup');
    if (option.exclude) cmds.push('-e', option.exclude);
    cmds.push('--entryFileNames');
    if (option.format[i] === 'iife') {
      cmds.push(`"[name].js"`);
      cmds.push('--name', option.name);
      if (option.exclude) {
        cmds.push('-g');
        let exclude = option.exclude.split(',');
        let excludes = []
        exclude.forEach(lib => {
          excludes.push(`${lib}:${path.parse(lib)['name']}`)
        });
        cmds.push(excludes);
      }
    }
    else if (option.format[i] === 'es') cmds.push(`"[name].mjs"`);
    else cmds.push(`"[name].${option.format[i]}"`);

    // console.log(cmds);
    let rollup_cmd = cmds.join(' ');
    exec(rollup_cmd);
  }
  // tsx
  let tsx_target = `${option.name}${path.parse(input)['ext']}`;
  let tsx_shell = `npx tsc --allowJs --declaration --emitDeclarationOnly --rootDir ${output} --outDir ${output} --types node ${output}/${tsx_target}`;
  // console.log(tsx_shell);
  if (fs.file.exists(`${output}/${tsx_target}`)) {
    exec(tsx_shell);
  }
  // package.json
  if(option.package) {
    let pkg = JSON.parse(fs.file.read(option.package));
    let root = path.basename(output);
    let dist = {
      mts: `${root}/${option.name}.d.mts`,
      mjs: `${root}/${option.name}.mjs`,
      cjs: `${root}/${option.name}.cjs`,
      js: option.format.includes('iife') ? `${root}/${option.name}.js` : false
    };
    if( !pkg.type || (pkg.type === 'commonjs') ) {
      pkg.main = dist.cjs;
    }
    else {
      pkg.main = dist.mjs;
    }
    pkg.module = dist.mjs;
    if(dist.js) {
      pkg.jsdelivr = dist.js
    }
    let slash = root === '.' ? '' : './';
    if(!pkg.exports) pkg.exports = { '.': ''}
    pkg.exports['.'] = {
      types: `${slash}${dist.mts}`,
      import: `${slash}${dist.mjs}`,
      require: `${slash}${dist.cjs}`
    }
    const json = JSON.stringify(pkg, 0, 2);
    // console.log(json);
    fs.file.create(option.package, json);
  }
  // asset
  if(option.asset) {
    let assets = option.asset.split(',');
    for(let i in assets) {
      let filename = path.basename(assets[i]);
      fs.copy(assets[i], `${output}/${filename}`, { overwrite: true});
    }
  }
}

export default build;