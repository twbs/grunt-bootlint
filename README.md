# grunt-bootlint

> A Grunt wrapper for [Bootlint](https://www.npmjs.org/package/bootlint), the HTML linter for [Bootstrap](http://getbootstrap.com) projects

[![NPM version](https://badge.fury.io/js/grunt-bootlint.svg)](http://badge.fury.io/js/grunt-bootlint)
[![Build Status](https://travis-ci.org/zacechola/grunt-bootlint.svg?branch=master)](https://travis-ci.org/zacechola/grunt-bootlint)
[![Dependency Status](https://david-dm.org/zacechola/grunt-bootlint.svg)](https://david-dm.org/zacechola/grunt-bootlint)
[![devDependency Status](https://david-dm.org/zacechola/grunt-bootlint/dev-status.svg)](https://david-dm.org/zacechola/grunt-bootlint#info=devDependencies)

[![NPM](https://nodei.co/npm/grunt-bootlint.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/grunt-bootlint/)

## Getting Started
This plugin requires Grunt `~0.4.5`

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
    files: ['path/to/file.html', 'path/to/*.html'],
  },
});
```

### Options

### Usage Examples

#### Default Options
In this example, the default options are used to lint two files for common errors in bootstrap.

```js
grunt.initConfig({
  bootlint: {
    options: {
      stoponerror: false,
      stoponwarning: false,
      relaxerror: []
    },
    files: ['test/fixtures/**.html'],
  },
});
```

### Settings

#### options.stoponerror

* Type: `Boolean`
* Default: `false`

Breaks out of grunt task on first error problem ID. Use `--force` to force continue.

Example:

```javascript
grunt.initConfig({
  bootlint: {
    options: {
      stoponerror: true
    },
    files: ['test/fixtures/**.html'],
  },
});
```

#### options.stoponwarning

* Type: `Boolean`
* Default: `false`

Breaks out of grunt task on first warning problem ID. Use `--force` to force continue.

Example:

```javascript
grunt.initConfig({
  bootlint: {
    options: {
      stoponwarning: true
    },
    files: ['test/fixtures/**.html'],
  },
});
```


#### options.showallerrors (Coming in v0.7.0)

* Type: `Boolean`
* Default: `false`

Shows all errors and warnings before stopping the task. (Overrides `stoponerror` and `stoponwarning`, above.)

Example:

```javascript
grunt.initConfig({
  bootlint: {
    options: {
      showallerrors: true
    },
    files: ['test/fixtures/**.html'],
  },
});
```


#### options.relaxerror

* Type: `Array`
* Default: `[]`

Array of [bootlint problem ID codes](https://github.com/twbs/bootlint/wiki) (`String`s) to explicitly ignore.

Example:

```javascript
grunt.initConfig({
  bootlint: {
    options: {
      relaxerror: ['W001', 'E001']
    },
    files: ['test/fixtures/**.html'],
  },
});

```
#### optioins.reportXML
* Default:'path/to/file.xml'

Example:

```javascript
grunt.initConfig({
  bootlint: {
    options: {
      reportXML: 'report/bootlint.xml'
    },
    files: ['test/fixtures/**.html'],
  },
});

```

#### optioins.reportCSV
* Default:'path/to/file.csv'

Example:

```javascript
grunt.initConfig({
  bootlint: {
    options: {
      reportCSV: 'report/bootlint.csv'
    },
    files: ['test/fixtures/**.html'],
  },
});

```

#### optioins.reportTAP
* Default:'path/to/file.tap'

Example:

```javascript
grunt.initConfig({
  bootlint: {
    options: {
      reportTAP: 'report/bootlint.tap'
    },
    files: ['test/fixtures/**.html'],
  },
});

```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

- 2015-2-3   - v0.7.0: Added downloadable report formats checkstyle format .xml, pipe delimited .csv, binary format .tap
- 2015-1-23  - v0.7.0: Updates Bootlint to v0.10.0
- 2014-12-23 - v0.6.0: Updates Bootlint to v0.9.1
- 2014-11-12 - v0.5.3: Fixes issue with `stoponerror` option
- 2014-11-12 - ~~v0.5.2: Fixes issue with `stoponerror` option~~ *This was a bad release. Please upgrade.*
- 2014-11-10 - v0.5.1: Displays message when files pass
- 2014-11-10 - v0.5.0: Updates Bootlint, adds line/col numbers to output, quieter output.
- 2014-11-03 - v0.4.0: Updates Bootlint dependency.
- 2014-10-17 - v0.3.0: Basic support for Bootlint 0.5.0. **Changes
`relaxerror` to use Bootlint problem IDs**
- 2014-09-25 - v0.2.1: Removes color dependency.
- 2014-09-25 - v0.2.0: First formal release.
