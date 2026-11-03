#!/usr/bin/env node

import Cmd from '@jlbyte/cmd';
import pkg from './package.json' with { type: 'json' }
import { exec, fs } from '@jlbyte/sys';
import path from 'path';

const cli = new Cmd({
  name: 'dev',
  version: pkg.version,
  description: pkg.description
});

cli.ctx = {};
cli
  .command('build', { description: 'build js or css' })
  .argument('type', 'js|css', true)
  .argument('input', 'source input', true)
  .argument('output', 'destination output', true)
  .option('-f, --format', 'output format: es,cjs,iife')
  .option('-n, --name', 'export namespace')
  .option('-e, --exlude', 'dependencies')
  .option('-p, --package', 'path to package.json')
  .action(async (c) => {
    let build = {
      type: c.args[0],
      input: c.args[1],
      output: c.args[2]
    };
    cli.ctx.build = build;
    if (build.type === 'js') {
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
      // rollup
      for (let i in format) {
        let cmds = ['npx', 'rollup'];
        cmds.push(`--input.${option.name}=${build.input}`);
        cmds.push('--dir');
        cmds.push(build.output);
        cmds.push('--format');
        cmds.push(format[i]);
        cmds.push('-p');
        cmds.push('node-resolve,commonjs');
        if (option.exclude) {
          cmds.push('-e');
          cmds.push(option.exclude)
        }
        cmds.push('--entryFileNames');
        if (format[i] === 'iife') {
          cmds.push(`"[name].js"`);
          cmds.push('--name');
          cmds.push(option.name);
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
        else if (format[i] === 'es') {
          cmds.push(`"[name].mjs"`)
        }
        else {
          cmds.push(`"[name].${format[i]}"`)
        }
        cli.ctx.cmds.push(cmds);

        let rollup_cmd = cmds.join(' ');
        cli.ctx.rollup.push(rollup_cmd);
        exec(rollup_cmd);
        
        let is_last = parseInt(i) === (format.length - 1);
        if (is_last) {}
      }
      // tsx
      let tsx_target = `${option.name}${path.parse(build.input)['ext']}`;
      let tsx_shell = `npx tsc --allowJs --declaration --emitDeclarationOnly --rootDir ${build.output} --outDir ${build.output} --types node ${build.output}/${tsx_target}`;
      cli.ctx.tsx.target = {
        name: tsx_target,
        path: `${build.output}/${tsx_target}`,
        shell: tsx_shell
      }
      if (fs.file.exists(`${build.output}/${tsx_target}`)) {
        exec(tsx_shell);
      }
      // package
      if(option.package) {
        let pkg = JSON.parse(fs.file.read(option.package));
        build.root = path.basename(build.output);
        cli.ctx.build.root = build.root;
        let dist = {
          mts: `${build.root}/${option.name}.d.mts`,
          mjs: `${build.root}/${option.name}.mjs`,
          cjs: `${build.root}/${option.name}.cjs`,
          js: option.format.includes('iife') ? `${build.root}/${option.name}.js` : false
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
        let slash = build.root === '.' ? '' : './';
        pkg.exports['.'] = {
          types: `${slash}${dist.mts}`,
          import: `${slash}${dist.mjs}`,
          require: `${slash}${dist.cjs}`
        }
        cli.ctx.pkg = pkg;
        fs.file.create(option.package, JSON.stringify(pkg, 0, 2));
      }
    }
  });

if (import.meta.main) {
  await cli.run();
}

export default cli;
