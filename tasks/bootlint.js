/*
 * grunt-bootlint
 * https://github.com/twbs/grunt-bootlint
 *
 * Copyright (c) 2014 Zac Echola
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var bootlint = require('bootlint');
  var chalk = require('chalk');


  grunt.registerMultiTask('bootlint', 'An HTML linter for Bootstrap projects', function() {
    var options = this.options({
      stoponerror: false,
      stoponwarning: false,
      showallerrors: false,
      relaxerror: []
    });

    var totalErrCount = 0;
    var totalFileCount = 0;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }

      })
      .forEach(function(filepath) {

        var src = grunt.file.read(filepath);
        var reporter = function (lint) {
          var isError = (lint.id[0] === 'E');
          var isWarning = (lint.id[0] === 'W');
          var lintId = (isError) ? chalk.bgGreen.white(lint.id) : chalk.bgRed.white(lint.id);
          var output = false;

          if (lint.elements) {
            lint.elements.each(function (_, element) {
              var loc = element.startLocation;
              grunt.log.warn(filepath + ":" + (loc.line + 1) + ":" + (loc.column + 1), lintId, lint.message);
              totalErrCount++;
              output = true;
            });

          }

          if (!output) {
            grunt.log.warn(filepath + ":", lintId, lint.message);
            totalErrCount++;
          }

          if (!options.showallerrors) {
            if ((isError && options.stoponerror) || (isWarning && options.stoponwarning)) {
              grunt.fail.warn('Too many bootlint errors.');
            }
          }

        };

        bootlint.lintHtml(src, reporter, options.relaxerror);
        totalFileCount++;
      });

      if (totalErrCount > 0 && !options.showallerrors) {
        grunt.log.writeln().fail(totalErrCount + " lint error(s) found across " + totalFileCount + " file(s).");
        grunt.log.writeln().fail('For details, look up the lint problem IDs in the Bootlint wiki: https://github.com/twbs/bootlint/wiki');
      } else if (totalErrCount > 0 && options.showallerrors) {
        grunt.fail.warn(totalErrCount + " lint error(s) found across " + totalFileCount + " file(s). ");
      } else {
        grunt.log.ok(totalFileCount + ' file(s) lint free.');
      }
    });
  });

};
