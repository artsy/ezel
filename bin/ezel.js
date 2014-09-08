#!/usr/bin/env node

var program = require('commander'),
    resolve = require('path').resolve,
    wrench = require('wrench');

program
  .version('0.2.1')
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

console.log("");
console.log("Generated new Ezel project at " + path)
console.log("");
console.log("install dependencies:");
console.log("$ cd " + path + " && npm install");
console.log("");
console.log("start the server:");
console.log("$ make s");
console.log("");