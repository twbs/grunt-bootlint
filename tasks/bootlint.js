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

  grunt.registerMultiTask('bootlint', 'An HTML linter for Bootstrap projects', function() {
    var options = this.options({
      stoponerror: false,
      relaxerror: []
    });
    var totalErrCount = 0;

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

        grunt.log.writeln(msg.start + filepath.ok);

        // Remove relaxed errors
        if (options.relaxerror.length) {
          errs = errs.filter(function(elem) {
            return options.relaxerror.indexOf(elem) < 0;
          });
        }

        errs.forEach(function (err) {
          totalErrCount += errs.length;
          if (options.stoponerror) {
            grunt.fail.warn(filepath + ':' + err.error);
          } else {
            grunt.log.warn(filepath + ':', err.error);
          }
        });

        if (!errs.length) { grunt.log.writeln(filepath.ok + ' is OK!'.ok); }

      });

      if (totalErrCount > 0) {
        grunt.log.writeln(totalErrCount + ' lint errors found.');
      } else {
        grunt.log.writeln(msg.done);
      }
    });
  });

};
