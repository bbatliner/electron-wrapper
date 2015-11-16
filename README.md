# electron-wrapper

A utility to wrap any website in a native Electron application. All you need is the URL!

[![NPM module](https://img.shields.io/npm/v/electron-wrapper.svg)](https://npmjs.org/package/electron-wrapper)

## Installation

```bash
npm install -g electron-wrapper
```

## Usage

```bash
// The most basic usage: a URL and a platform.
electron-wrapper -u https://google.com -p win32

// Specify an output directory
electron-wrapper -u https://messenger.com -p linux -o ~/messenger

// Specify the name of your app
electron-wrapper -u https://play.google.com/music -p all -n "Google Play Music"
```

Run `electron-wrapper -h` for more options.

## License

The MIT License (MIT)

Copyright (c) 2015 Brendan Batliner
