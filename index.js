'use strict';

var URL = require('url');
var commandLineArgs = require('command-line-args');
var usage = require('./usage.js');
var generator = require('./src/generator.js');

module.exports = function () {
  var cli = commandLineArgs(usage.args);
  var options = cli.parse();

  if (options.h || !options.url || !options.platform) {
    return console.log(cli.getUsage(usage.options));
  }

  // Gets the "simple name" of a website. For example, http://google.com becomes google.
  var hostname = URL.parse(options.url).hostname;
  options.name = options.name || hostname.substring(0, ~hostname.indexOf('.') ? hostname.indexOf('.') : hostname.length);

  options.dir = 'tmp_app_dir';
  generator(options);
};
