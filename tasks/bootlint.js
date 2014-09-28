/*
 * grunt-bootlint
 * https://github.com/zacechola/grunt-bootlint
 *
 * Copyright (c) 2014 Zac Echola
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var bootlint = require('bootlint');

  grunt.registerMultiTask('bootlint', 'An HTML linter for Bootstrap projects', function() {
    var options = this.options({
      stoponerror: false,
      relaxerror: []
    });
    var totalErrCount = 0;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      var sourceFiles = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.fail.warn('Source file "' + filepath + '" not found!');
          return false;
        } else {
          return true;
        }

      });

      if (sourceFiles.length === 0) {
        grunt.fail.warn('Source files (' + f.dest + ') not found!');
        return false;
      }

      sourceFiles.forEach(function(filepath) {
        var src = grunt.file.read(filepath);
        var errs = bootlint.lintHtml(src);

        // Remove relaxed errors
        if (options.relaxerror.length) {
          errs = errs.filter(function(elem) {
            return options.relaxerror.indexOf(elem) < 0;
          });
        }

        errs.forEach(function (err) {
          totalErrCount += errs.length;
          if (options.stoponerror) {
            grunt.fail.warn(filepath + ':' + err);
          } else {
            grunt.log.warn(filepath + ':', err);
          }
        });

      });

      if (totalErrCount > 0) {
        grunt.fail.warn(totalErrCount + ' lint errors found.');
      } else {
        grunt.log.success('No Bootlint errors!');
      }

    });
  });

};
