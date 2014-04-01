#!/usr/bin/env node

var program = require('commander'),
    resolve = require('path').resolve,
    wrench = require('wrench');

program
  .version('0.1.0')
  .usage('[options] [dir]')
  .option('-c, --clean', 'Clean version without the Github example code.')
  .option('-cs, --coffeescript', 'Use coffeescript.')
  .parse(process.argv);

var path = program.args.shift() || '.';
var src = resolve(__dirname, '../src');

if (program.coffeescript && program.clean) {
  wrench.copyDirSyncRecursive(src + '/cs-clean', path);
} else if (program.coffeescript) {
  wrench.copyDirSyncRecursive(src + '/cs-example', path);
} else if (program.clean){
  wrench.copyDirSyncRecursive(src + '/js-clean', path);
} else {
  wrench.copyDirSyncRecursive(src + '/js-example', path);
}