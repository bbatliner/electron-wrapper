'use strict';

var fs = require('fs');
var packager = require('electron-packager');

var defaultDir = 'tmp_app_dir';
var srcName = 'index.js';

module.exports = function (options) {
  var dir = options.dir || defaultDir;
  var srcPath = dir + '/' + srcName;
  var pkgjsonPath = dir + '/package.json';

  // Use a template string for the src file.
  // TODO: Move this to another file for maintainability.
  var src = `'use strict';

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, 'auto-hide-menu-bar': true, 'web-preferences': { 'node-integration': false }});

  // and load the index.html of the app.
  mainWindow.loadUrl('${options.url}');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
  `;

  // Generate the simplest package.json possible that tells Electron where to find the app.
  var pkgjson = `{
    "main": "${srcName}"
  }
  `;

  // Write the src and package.json to a temp dir
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(srcPath, src);
  fs.writeFileSync(pkgjsonPath, pkgjson);

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
    fs.rmdirSync(dir);
    // Show the user the location if successful
    if (appPath.length) {
      console.log('App built at', appPath[0]);
    }
  });
};
  