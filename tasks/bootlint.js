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
  var chalk = require('chalk');

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
      var lintId = (lint.id[0] === 'E') ? chalk.bgGreen.white(lint.id) : chalk.bgRed.white(lint.id);
      if (options.stoponerror) {
        grunt.fail.warn(lintId, lint.message);
      } else {
        grunt.log.warn(lintId, lint.message);
        totalErrCount++;
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
        grunt.log.writeln().fail('For details, look up the lint problem IDs in the Bootlint wiki: https://github.com/twbs/bootlint/wiki');
      } else {
        grunt.log.writeln().success(msg.done);
      }
    });
  });

};
