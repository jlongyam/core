#!/usr/bin/env node
import Cmd from '@jlbyte/cmd';
import pkg from './package.json' with { type: 'json' }
import { exec, fs } from '@jlbyte/sys';

const cli = new Cmd({
  name: 'dev',
  version: pkg.version,
  description: pkg.description
});

cli
  .command('build', { description: 'build js or css' })
  .argument('type', '"js"', true)
  .argument('input', '"src" input', true)
  .argument('output', '"dist" output', true)
  .option('-f, --format', 'output format [mjs,cjs,iife]')
  .option('-n, --name', 'export "name"')
  .option('-e, --exlude', '[dependency]')
  .action(async (context)=> {
    let build_type = context.args[0];
    if( build_type === 'js') {
      let build_input = context.args[1];
      let build_output = context.args[2];
      let has_name = !!context.options['n'] || !!context.options['name'];
      let cfg_name = has_name ? context.options['n'] || context.options['name'] : false;
      let f = context.options.format || context.options.f;
      let format = f.split(',');
      for(let i in format) {
        let cmds = [ 'npx', 'rollup'];
        if(has_name) cmds.push(`--input.${cfg_name}=${build_input}`);
        else cmds.push(`--input=${build_input}`);
        cmds.push('--dir');
        cmds.push(build_output);
        cmds.push('--format');
        cmds.push(format[i]);
        cmds.push('--entryFileNames');
        
        if(format[i] === 'iife') {
          cmds.push(`"[name].js"`);
          cmds.push('--name');
          cmds.push(cfg_name);
        }
        else if(format[i] === 'es') {
           cmds.push(`"[name].mjs"`)
        }
        else {
          cmds.push(`"[name].${format[i]}"`)
        }
        let new_cmds = cmds.join(' ');
        //exec(`${new_cmds}`);
      }
      
      // tsc --allowJs --declaration --emitDeclarationOnly --rootDir ./dist --outDir ./dist/types ./dist/ansi.mjs
      // console.log()

    }
  });

cli.run(['build','js', './temp/ansi/src/index.mjs', './temp/ansi/dist', '-n', 'ansi', '-f', 'es,cjs']);