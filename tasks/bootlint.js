/*
 * grunt-bootlint
 * https://github.com/zacechola/grunt-bootlint
 *
 * Copyright (c) 2014 Zac Echola
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var bootlint = require('../node_modules/bootlint/src/bootlint'); // Explicit since the search algo fails on the bootlint directory structure
  var colors = require('colors');

  colors.setTheme({
    ok: 'green',
    error: 'red',
    warning: 'yellow'
  });

  var msg = {
    start: 'Validation started for '.ok,
    ok: 'Validation successful!'.ok,
    error: 'Error:'.error,
    done: 'All Done!'.bold.ok
  };

  var totalErrCount = 0;


  grunt.registerMultiTask('bootlint', 'An HTML linter for Bootstrap projects', function() {
    var options = this.options({
      stoponerror: false
    });

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

        var errs = bootlint.lintHtml(src);
        totalErrCount += errs.length;

        errs.forEach(function (msg) {
          if (options.stoponerror) {
            grunt.fail.warn(filepath + ':' + msg.error);
          } else {
            grunt.log.warn(filepath + ':', msg.error);
          }
        });
      });

      if (totalErrCount > 0) {
        grunt.log.warn(totalErrCount + ' lint errors found.');
      } else {
        grunt.log.writeln(msg.done);
      }
    });
  });

};
