#!/usr/bin/env node
const {argv} = require('yargs');
if (argv._.length < 3) {
  console.log('Usage: set-version-in-files <package.json> <replace token> <files>');
  process.exit();
}

const {setPackageVersion} = require('../index');
const [pkgJson, token, files] = argv._;
setPackageVersion(pkgJson, token, files).then(changes => {
  if (Array.isArray(changes) && changes.length) {
    console.log('Set version in files:');
    for (let f of changes) {
      console.log('  ' + f);
    }
  }
});
