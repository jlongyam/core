import execSh from 'exec-sh';
import FS from 'fs-jetpack';

const exec = execSh.promise;
function fs(s = false) {
  if(s) {
    return FS.cwd(s).cwd();
  }
  else return FS.cwd()
}
fs.exists = (p = false)=> p ? !!FS.exists(p): p;
fs.isFile = (p)=> FS.exists(p) === 'file';
fs.isFolder = (p)=> FS.exists(p) === 'dir';

fs.delete = FS.remove;
fs.copy = FS.copy;

fs.file = FS.file;
fs.file.exists = fs.exists;
fs.file.read = FS.read;
fs.file.append = FS.append;
fs.file.create = FS.write;
fs.file.delete = (p)=> fs.isFolder(p) ? false: fs.delete(p);

fs.folder = FS.dir;
fs.folder.list = FS.list;
fs.folder.delete = (p)=> fs.isFile(p) ? false: fs.delete(p);

async function download(url) {
  await exec(`curl -OLs ${url}`)
};
async function extract(path) {
  let target = path.replace('.zip','');
  if(!fs.isFolder(target)) {
    await exec(`mkdir ${target}`);
  }
  await exec(`unzip -qn ${path} -d ${target}`);
}

fs.download = download;
fs.extract = extract;

export { exec, fs };