# grunt-bootlint

> An HTML linter for Bootstrap projects

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
    files: {
      ['path/to/file.html', 'path/to/*.html'];
    },
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
      relaxerror: []
    },
    files: {
      ['test/fixtures/**.html'],
    },
  },
});
```

### Settings

#### options.stoponerror

* Type: `Boolean`
* Default: `false`

Breaks out of grunt task on first error. Use `--force` to force continue.

#### options.relaxerror

* Type: `Array`
* Default: `[]`

Array of bootlint messages (`String`s) to explicitly ignore.

Example:

```javascript
grunt.initConfig({
  bootlint: {
    options: {
      relaxerror: ['Document is missing a DOCTYPE declaration']
    },
    files: {
      ['test/fixtures/**.html'],
    },
  },
});

```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
