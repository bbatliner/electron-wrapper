'use strict';

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var ncp = require('ncp').ncp;
var Mustache = require('mustache');
var packager = require('electron-packager');

var templatesDir = 'templates';
var srcName = 'index.js';

module.exports = function (options) {
  var dir = options.dir || 'tmp_app_dir';
  var srcPath = dir + '/' + srcName;
  var pkgjsonPath = dir + '/package.json';

  // Generate the Electron source for the url
  var src = Mustache.render(fs.readFileSync(path.join(__dirname, templatesDir, 'index.mst'), 'utf8'), { url: options.url });
  // Generate the simplest package.json possible that tells Electron where to find the app.
  var pkgjson = Mustache.render(fs.readFileSync(path.join(__dirname, templatesDir, 'package.json.mst'), 'utf8'), { srcName: srcName });

  // Write the src and package.json to a temp dir
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  mkdirp.sync(dir + '/node_modules');
  fs.writeFileSync(srcPath, src);
  fs.writeFileSync(pkgjsonPath, pkgjson);

  // Write the electron-localshortcut node module from this app's node_modules folder
  ncp('./node_modules/electron-localshortcut', dir + '/node_modules/electron-localshortcut', function (err) {
    if (err) throw err;

    // Build the electron app!
    packager({
      dir: dir,
      name: options.name,
      platform: options.platform,
      arch: options.arch,
      version: options.version,
      overwrite: options.overwrite
    }, function (err, appPath) {
      if (err) throw err;
      // Clean up
      fs.unlinkSync(srcPath);
      fs.unlinkSync(pkgjsonPath);
      rimraf.sync(dir);
      // Show the user the location if successful
      if (appPath.length) {
        console.log('App built at', appPath[0]);
      }
    });
  });
};
  