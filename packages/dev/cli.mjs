#!/usr/bin/env node

import Cmd from '@jlbyte/cmd';
import pkg from './package.json' with { type: 'json' }
import { exec, fs } from '@jlbyte/sys';
import path from 'path';
import { type } from 'os';

const cli = new Cmd({
  name: 'dev',
  version: pkg.version,
  description: pkg.description
});
cli.ctx = {};
cli
  .command('build', { description: 'js|css' })
  .argument('type', '"js"', true)
  .argument('input', '"src" input', true)
  .argument('output', '"dist" output', true)
  .option('-f, --format', 'output format [es,cjs,iife]')
  .option('-n, --name', 'export "name"')
  .option('-e, --exlude', '[dependency]')
  .option('-p, --package', 'path to "package.json"')
  .action(async (c)=> {
    let build = {
      type: c.args[0],
      input: c.args[1],
      output: c.args[2]
    };
    cli.ctx.build = build;
    if( build.type === 'js') {
      let option = {
        format: c.options.format || c.options.f || 'es,cjs',
        name: c.options.name || c.options.n || path.parse(build.input)['name'],
        exclude: c.options.exclude || c.options.e || false,
        package: c.options.package || c.options.p || false
      }
      cli.ctx.option = option;
      let format = option.format.split(',');
      cli.ctx.cmds = [];
      cli.ctx.rollup = [];
      cli.ctx.tsx = {};
      for(let i in format) {
        let cmds = [ 'npx', 'rollup'];
        cmds.push(`--input.${option.name}=${build.input}`);
        cmds.push('--dir');
        cmds.push(build.output);
        cmds.push('--format');
        cmds.push(format[i]);
        cmds.push('-p');
        cmds.push('node-resolve,commonjs');
        if(option.exclude) {
          cmds.push('-e');
          cmds.push(option.exclude)
        }
        cmds.push('--entryFileNames');
        if(format[i] === 'iife') {
          cmds.push(`"[name].js"`);
          cmds.push('--name');
          cmds.push(option.name);
          if(option.exclude) {
            cmds.push('-g');
            let exclude = option.exclude.split(',');
            let excludes = []
            exclude.forEach(lib => {
              excludes.push(`${lib}:${path.parse(lib)['name']}`)
            });
            cmds.push(excludes);
          }
        }
        else if(format[i] === 'es') {
          cmds.push(`"[name].mjs"`)
        }
        else {
          cmds.push(`"[name].${format[i]}"`)
        }
        cli.ctx.cmds.push(cmds);

        let rollup_cmd = cmds.join(' ');
        cli.ctx.rollup.push(rollup_cmd);
        exec(rollup_cmd);
        let is_last = parseInt(i) === (format.length -1);
        if(is_last) {
          let tsx_target = path.basename(build.input);
          let tsx_shell = `npx tsc --allowJs --declaration --emitDeclarationOnly --rootDir ${build.output} --outDir ${build.output} --types node ${build.output}/${tsx_target}`;
          cli.ctx.tsx.target = {
            name: tsx_target,
            path: `${build.output}/${tsx_target}`,
            shell: tsx_shell
          }
          if(fs.file.exists(`${build.output}/${tsx_target}`)) {
            exec(tsx_shell);
          }
        }
      }
    }
  });

if (import.meta.main) {
  await cli.run();
}

export default cli;

//let parse_ansi = cli.parse(['build','js', './temp/ansi/src/index.mjs', './temp/ansi/dist', '-n', 'ansi', '-f', 'es,cjs,iife']);
//console.log(parse_ansi);
//cli.run(['build','js', './temp/ansi/src/index.mjs', './temp/ansi/dist', '-f', 'es,cjs,iife'])
//cli.run(['build','js', './temp/ansi/src/index.mjs', './temp/ansi/dist', '-n', 'ansi', '-f', 'es,cjs,iife']);
//cli.run(['build','js', './temp/ansi/src/index.mjs', './temp/ansi/dist', '-n', 'ansi', '-f', 'es,cjs,iife']);
//cli.run(['build', 'js', './temp/env/src/env.mjs', './temp/env/dist', '-n', 'env', '-f', 'es,cjs,iife', '-e', 'bowser'])
//cli.run(['build', 'js', './temp/cmd/src/Cmd.mjs', './temp/cmd/dist', '-n', 'Cmd', '-e', '@jlbyte/ansi', '-f', 'es,cjs']);
//cli.run(['build', 'js', './temp/tester/src/tester.mjs', './temp/tester/dist', '-n', 'tester', '-f', 'es,cjs,iife', '-e', '@jlbyte/ansi,@jlbyte/env'])
//cli.run(['build','js', './temp/dialog/index.mjs', './temp/dialog', '-f', 'es,cjs', '-e', '@clack/prompts']);
