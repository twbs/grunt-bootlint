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



  var msg = {
    start: 'Validation started for ',
    ok: 'Validation successful!',
    done: 'No Bootlint errors!'.bold
  };

  grunt.registerMultiTask('bootlint', 'An HTML linter for Bootstrap projects', function() {
    var options = this.options({
      stoponerror: false,
      relaxerror: []
    });
    var totalErrCount = 0;

    var reporter = function(lint) {
      if (options.stoponerror) {
        grunt.fail.warn(lint.message);
      } else {
        totalErrCount += 1;
        grunt.log.warn(lint.message);
      }
    };


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
        grunt.log.writeln(msg.start + filepath);
        bootlint.lintHtml(src, reporter, options.relaxerror);
      });

      if (totalErrCount > 0) {
        grunt.log.writeln().fail(totalErrCount + ' lint errors found.');
      } else {
        grunt.log.writeln().success(msg.done);
      }
    });
  });

};
