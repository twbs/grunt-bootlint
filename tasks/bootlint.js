/*
 * grunt-bootlint
 * https://github.com/twbs/grunt-bootlint
 *
 * Copyright (c) 2014-2015 Zac Echola
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var bootlint = require('bootlint');
  var chalk = require('chalk');
  var micromatch = require('micromatch');


  grunt.registerMultiTask('bootlint', 'An HTML linter for Bootstrap projects', function() {

    var options = this.options({
      stoponerror: false,
      stoponwarning: false,
      showallerrors: false,
      relaxerror: []
    });

    var totalErrCount = 0;
    var totalFileCount = 0;

    function getDisabledIdsForFilepath(filepath) {
      // Relaxerror defined as array without filepaths
      if (options.relaxerror instanceof Array) {
        return options.relaxerror;
      }

      // Relaxerror as object with error IDs as keys and filepaths as values
      var disabledIds = Object.keys(options.relaxerror);

      // Lookup disabled IDs filepaths
      var returnIds = disabledIds.filter(function(key) {
        var paths = options.relaxerror[key];

        // handle 'E001': true, 'E001': []
        if (!(paths instanceof Array) || paths.length === 0) {
          return true;
        }

        // handle 'E001': ['*']
        if (paths.indexOf('*') !== -1) {
          return true;
        }

        // test filepath pattern
        return micromatch.any(filepath, paths);
      });

      return returnIds;
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        return true;

      })
      .forEach(function(filepath) {

        var src = grunt.file.read(filepath);
        var reporter = function (lint) {
          var isError = lint.id[0] === 'E';
          var isWarning = lint.id[0] === 'W';
          var lintId = isError ? chalk.bgGreen.white(lint.id) : chalk.bgRed.white(lint.id);
          var output = false;

          if (lint.elements) {
            lint.elements.each(function (_, element) {
              var loc = element.startLocation;
              grunt.log.warn(filepath + ':' + (loc.line + 1) + ':' + (loc.column + 1), lintId, lint.message);
              totalErrCount++;
              output = true;
            });

          }

          if (!output) {
            grunt.log.warn(filepath + ':', lintId, lint.message);
            totalErrCount++;
          }

          if (!options.showallerrors) {
            if (isError && options.stoponerror || isWarning && options.stoponwarning) {
              grunt.fail.warn('Too many bootlint errors.');
            }
          }

        };

        var disabledIds = getDisabledIdsForFilepath(filepath);
        bootlint.lintHtml(src, reporter, disabledIds);
        totalFileCount++;
      });

      var errorStr = grunt.util.pluralize(totalErrCount, 'error/errors');
      var fileStr = grunt.util.pluralize(totalFileCount, 'file/files');

      if (totalErrCount > 0) {
        if (options.showallerrors) {
          grunt.fail.warn(totalErrCount + ' lint ' + errorStr + ' found across ' + totalFileCount + ' ' + fileStr + '.');
        } else {
          grunt.log.writeln().fail(totalErrCount + ' lint ' + errorStr + ' found across ' + totalFileCount + ' ' + fileStr + '.');
          grunt.log.writeln().fail('For details, look up the lint problem IDs in the Bootlint wiki: https://github.com/twbs/bootlint/wiki');
        }
      } else {
        grunt.log.ok(totalFileCount + ' ' + fileStr + ' lint free.');
      }

    });

  });
};
