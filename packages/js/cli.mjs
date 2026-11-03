import Cmd from '@jlbyte/cmd';
import { fs, exec } from '@jlbyte/sys';
import { confirm, isCancel } from '@jlbyte/dialog';
import path from 'path';

const cli = new Cmd('js');

cli
  .command('')
  .action(async ()=> {
    const proceed = await confirm({
      message: 'Do you want to continue?',
    });
    if (isCancel(proceed)) {
      console.log('Cancelled');
      process.exit(0);
    }
    if (proceed) console.log('OK, do nothing');
    else console.log('NO, why?');
  });

cli
  .command('build <input> <output>', 'build js file input to dir output')
  .option('-f, --format [type]', 'output format: es,cjs,iife', { default: 'es,cjs' })
  .option('-n, --name [namespace]', 'optional output namespace')
  .option('-e, --exclude [dependency]', 'comma separated exclude import link names', { default: false })
  .option('-p, --package [path]', 'path to package.json', { default: false })
  .action((input, output, options)=> {
    if(!fs.file.exists(input)) {
      console.error('file not exists');
      process.exit(0);
    };
    let option = {
      format: options.format.split(','),
      name: options.name || path.parse(input)['name'],
      exclude: options.exclude,
      package: options.package
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
      pkg.exports['.'] = {
        types: `${slash}${dist.mts}`,
        import: `${slash}${dist.mjs}`,
        require: `${slash}${dist.cjs}`
      }
      fs.file.create(option.package, JSON.stringify(pkg, 0, 2));
    }
  });

cli.help();

if (import.meta.main) {
  try {
    cli.parse();
  }
  catch(e) {
    console.error(e.message);
  }
}

export { cli }