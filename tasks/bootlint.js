/*
 * grunt-bootlint
 * https://github.com/twbs/grunt-bootlint
 *
 * Copyright (c) 2014-2015 Zac Echola
 * Licensed under the MIT license.
 */

'use strict';

const bootlint = require('bootlint');
const chalk = require('chalk');
const micromatch = require('micromatch');

module.exports = function(grunt) {
  grunt.registerMultiTask('bootlint', 'An HTML linter for Bootstrap projects', function() {
    const options = this.options({
      stoponerror: false,
      stoponwarning: false,
      showallerrors: false,
      relaxerror: []
    });

    let totalErrCount = 0;
    let totalFileCount = 0;

    function getDisabledIdsForFilepath(filepath) {
      // Relaxerror defined as array without filepaths
      if (Array.isArray(options.relaxerror)) {
        return options.relaxerror;
      }

      // Relaxerror as object with error IDs as keys and filepaths as values
      const disabledIds = Object.keys(options.relaxerror);

      // Lookup disabled IDs filepaths
      const returnIds = disabledIds.filter((key) => {
        const paths = options.relaxerror[key];

        // handle 'E001': true, 'E001': []
        if (!Array.isArray(paths) || paths.length === 0) {
          return true;
        }

        // handle 'E001': ['*']
        if (paths.includes('*')) {
          return true;
        }

        // test filepath pattern
        return micromatch.any(filepath, paths);
      });

      return returnIds;
    }

    // Iterate over all specified file groups.
    this.files.forEach((f) => {
      f.src.filter((filepath) => {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn(`Source file "${filepath}" not found.`);
          return false;
        }
        return true;
      })
        .forEach((filepath) => {
          const src = grunt.file.read(filepath);
          const disabledIds = getDisabledIdsForFilepath(filepath);
          const reporter = (lint) => {
            const isError = lint.id.startsWith('E');
            const isWarning = lint.id.startsWith('W');
            const lintId = isError ? chalk.bgGreen.white(lint.id) : chalk.bgRed.white(lint.id);
            let output = false;

            if (lint.elements) {
              lint.elements.each((_, element) => {
                const loc = element.startLocation;

                grunt.log.warn(`${filepath}:${loc.line + 1}:${loc.column + 1}`, lintId, lint.message);
                totalErrCount++;
                output = true;
              });
            }

            if (!output) {
              grunt.log.warn(`${filepath}:`, lintId, lint.message);
              totalErrCount++;
            }

            if (!options.showallerrors) {
              if ((isError && options.stoponerror) || (isWarning && options.stoponwarning)) {
                grunt.fail.warn('Too many bootlint errors.');
              }
            }
          };

          bootlint.lintHtml(src, reporter, disabledIds);
          totalFileCount++;
        });

      const errorStr = grunt.util.pluralize(totalErrCount, 'error/errors');
      const fileStr = grunt.util.pluralize(totalFileCount, 'file/files');

      if (totalErrCount > 0) {
        if (options.showallerrors) {
          grunt.fail.warn(`${totalErrCount} lint ${errorStr} found across ${totalFileCount} ${fileStr}.`);
        } else {
          grunt.log.writeln().fail(`${totalErrCount} lint ${errorStr} found across ${totalFileCount} ${fileStr}.`);
          grunt.log.writeln().fail('For details, look up the lint problem IDs in the Bootlint wiki: https://github.com/twbs/bootlint/wiki');
        }
      } else {
        grunt.log.ok(`${totalFileCount} ${fileStr} lint free.`);
      }
    });
  });
};
