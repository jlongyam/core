import { execSync } from 'node:child_process';
import * as node_fs from 'node:fs'
import path from 'node:path';

const execSh = (cmd)=> execSync(cmd, { encoding: 'utf8' })
const exec = (cmd)=> execSync(cmd, { stdio: 'inherit' });

function fs(s = false) {
  if(s) {
    process.chdir(s);
    return execSh('ls -1A').trim().split('\n');
  }
  else return process.cwd()
}
fs.exists = (path, type)=> {
  if (!path) return false;
  try {
    const stat = node_fs.statSync(path);
    if (type === 'file')   return stat.isFile();
    if (type === 'dir')    return stat.isDirectory();
    return true;
  } catch {
    return false;
  }
}
fs.isFile = (p)=> fs.exists(p, 'file');
fs.isFolder = (p)=> fs.exists(p, 'dir');
fs.remove = (p)=> node_fs.rmSync(p, { recursive: true, force: true });
fs.delete = fs.remove;
fs.folder = (p)=> node_fs.mkdirSync(p, { recursive: true });
fs.folder.create = fs.folder;
fs.folder.list = (p)=> !p ? [] : node_fs.readdirSync(p);
fs.file = (p, data, append = false)=> {
  fs.folder.create(path.dirname(p));
  const flag = append ? 'a' : 'w';
  try {
    node_fs.writeFileSync(p, data, { flag, encoding: 'utf8' });
    return true;
  } catch (e) {
    if (!append && e.code === 'EPERM') {
      try {
        node_fs.writeFileSync(p, data, { flag: 'r+', encoding: 'utf8' });
        return true;
      } catch {}
    }
    console.error('write failed:', e.code, e.message);
    return false;
  }
}
fs.file.exists = (p)=> fs.exists(p, 'file');
fs.file.read = (p, image = false)=> image ? node_fs.readFileSync(p) : node_fs.readFileSync(p, 'utf8');
fs.file.append = (p, data)=> fs.file(p, data, true);
fs.file.create = fs.file;
fs.file.delete = fs.delete;
fs.folder.delete = fs.delete;
fs.file.copy = (from, to)=> {
  fs.folder.create(path.dirname(to));
  node_fs.copyFileSync(from, to);
};
fs.folder.exists = (p)=> fs.exists(p, 'dir');
fs.folder.copy = (from, to)=> node_fs.cpSync(from, to, { recursive: true });
fs.copy = (from, to)=> {
  if(fs.isFile(from)) fs.file.copy(from,to);
  if(fs.isFolder(from)) fs.folder.copy(from,to);
};
fs.download = (url)=> {
  exec(`curl -OLs ${url}`)
};
fs.file.download = fs.download;
fs.extract = (p)=> {
  let target = p.replace('.zip','');
  if(!fs.isFolder(target)) {
    fs.folder(target)
  }
  exec(`unzip -qn ${p} -d ${target}`);
};
fs.file.extract = fs.extract;

export { execSh, exec, fs };