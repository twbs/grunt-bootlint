# grunt-bootlint

> A Grunt wrapper for [Bootlint](https://www.npmjs.org/package/bootlint), the HTML linter for [Bootstrap](http://getbootstrap.com) projects

[![NPM version](https://img.shields.io/npm/v/grunt-bootlint.svg)](https://www.npmjs.com/package/grunt-bootlint)
[![Build Status](https://img.shields.io/travis/twbs/grunt-bootlint.svg?branch=master)](https://travis-ci.org/twbs/grunt-bootlint)
[![MIT License](https://img.shields.io/npm/l/grunt-bootlint.svg)](https://github.com/twbs/grunt-bootlint/blob/master/LICENSE-MIT)
[![Dependency Status](https://img.shields.io/david/twbs/grunt-bootlint.svg)](https://david-dm.org/twbs/grunt-bootlint)
[![devDependency Status](https://img.shields.io/david/dev/twbs/grunt-bootlint.svg)](https://david-dm.org/twbs/grunt-bootlint#info=devDependencies)

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bootlint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bootlint');
```

## The "bootlint" task

### Overview

In your project's Gruntfile, add a section named `bootlint` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bootlint: {
    options: {
      stoponerror: false,
      relaxerror: []
    },
    files: ['path/to/file.html', 'path/to/*.html']
  }
});
```

### Options

### Usage Examples

#### Default Options

In this example, the default options are used to lint files for common problems in bootstrap.

```js
grunt.initConfig({
  bootlint: {
    options: {
      relaxerror: [],
      showallerrors: false,
      stoponerror: false,
      stoponwarning: false
    },
    files: ['test/fixtures/*.html']
  }
});
```

### Settings

#### options.stoponerror

* Type: `Boolean`
* Default: `false`

Breaks out of grunt task on first error problem ID. Use `--force` to force continue.

#### options.stoponwarning

* Type: `Boolean`
* Default: `false`

Breaks out of grunt task on first warning problem ID. Use `--force` to force continue.

#### options.showallerrors

* Type: `Boolean`
* Default: `false`

Shows all errors and warnings before stopping the task. (Overrides `stoponerror` and `stoponwarning`, above.)

#### options.relaxerror

* Type: `Array` | `Object`
* Default: `[]`

Array of [bootlint problem ID codes][] (`String`s) to explicitly ignore.

Object of [bootlint problem ID codes][] as **keys** and filepath globs as array **value**.

##### Example

```js
relaxerror: {
  'E001': [],
  'W005': [
    'path/to/file.html',
    'file/path/*.glob'
  ]
},
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2016-04-05 - v0.10.1: Updates for Grunt 1.0.0 compatibility and adds pluralize for files/errors.
* 2015-11-24 - v0.10.0: Updates Bootlint to v0.14.1 and adds the ability to ignore lint problems on a per-file basis using `relaxerror`.
* 2015-06-01 - v0.9.1: Minor update to license metadata.
* 2015-03-16 - v0.9.0: Updates Bootlint to v0.12.0
* 2015-02-25 - v0.8.0: Updates Bootlint to v0.11.0
* 2015-01-23 - v0.7.0: Updates Bootlint to v0.10.0
* 2014-12-23 - v0.6.0: Updates Bootlint to v0.9.1
* 2014-11-12 - v0.5.3: Fixes issue with `stoponerror` option
* 2014-11-12 - ~~v0.5.2: Fixes issue with `stoponerror` option~~ *This was a bad release. Please upgrade.*
* 2014-11-10 - v0.5.1: Displays message when files pass
* 2014-11-10 - v0.5.0: Updates Bootlint, adds line/col numbers to output, quieter output.
* 2014-11-03 - v0.4.0: Updates Bootlint dependency.
* 2014-10-17 - v0.3.0: Basic support for Bootlint 0.5.0. **Changes `relaxerror` to use Bootlint problem IDs**
* 2014-09-25 - v0.2.1: Removes color dependency.
* 2014-09-25 - v0.2.0: First formal release.

## License and copyright

Code released under [the MIT license](https://github.com/twbs/grunt-bootlint/blob/master/LICENSE-MIT).

[bootlint problem ID codes]: https://github.com/twbs/bootlint/wiki
