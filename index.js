const replace = require('replace-in-file');
const fs = require('fs');
const spath = require('path');
const pify = require('pify');
const pread = pify(fs.readFile);

async function readJson(path) {
  const rpath = spath.resolve(path);
  const data = await pread(rpath);
  return JSON.parse(data);
}

module.exports = {
  async setPackageVersion(packageFile, token, fileGlob) {
    const pkg = await readJson(packageFile);
    if (!pkg) {
      return;
    }
    const changes = await replace({
      files: fileGlob,
      from: token,
      to: pkg.version
    });
    return changes;
  }
};