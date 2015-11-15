'use strict';

module.exports = {
  options: {
    title: 'Electron Wrapper',
    description: 'Wrap any website (url) in a native Electron application with one command.',
    synopsis: [
      'Only url and platform are required. See below for additional options.',
      '',
      'Usage: electron-wrapper [bold]{--url} [underline]{url} [bold]{--platform} [underline]{name}',
      '',
      'Example: electron-wrapper -u http://google.com -p win32'
    ]
  },

  args: [
    { name: 'help', alias: 'h', type: Boolean, description: 'Display this guide.' },
    { name: 'url', alias: 'u', type: String, description: 'The website to wrap.' },
    { name: 'name', alias: 'n', type: String, description: 'The name of the executable application.' },
    { name: 'platform', alias: 'p', type: String, description: 'The platform to target (linux, win32, darwin, all)' },
    { name: 'arch', alias: 'a', type: String, description: 'The system architecture to target. (ia32, x64, all)\nDefault: x64', defaultValue: 'x64' },
    { name: 'version', alias: 'v', type: String, description: 'The Electron version to build with.\nDefault: 0.34.3', defaultValue: '0.34.3' },
    { name: 'overwrite', type: Boolean, description: 'Overwrite existing application(s), if they are already built.' }
  ]
};