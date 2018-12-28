/*
 * grunt-bootlint
 * https://github.com/twbs/grunt-bootlint
 *
 * Copyright (c) 2014 Zac Echola
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    eslint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        configFile: '.eslintrc.json'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: 'tmp'
    },

    // Configuration to be run (and then tested).
    bootlint: {
      defaultOptions: {
        files: {
          'tmp/defaultOptions': 'test/fixtures/**.html'
        }
      },
      relaxerror: {
        options: {
          relaxerror: {
            'E001': [],
            'W005': 'test/fixtures/missing-jquery.html'
          }
        },
        files: {
          'tmp/relaxerror': [
            'test/fixtures/missing-doctype.html',
            'test/fixtures/missing-charset.html',
            'test/fixtures/missing-jquery.html'
          ]
        }
      },
      stoponerror: {
        options: {
          stoponerror: true
        },
        files: {
          'tmp/stoponerror': [
            'test/fixtures/missing-doctype.html',
            'test/fixtures/missing-charset.html',
            'test/fixtures/cols-redundant.html'
          ]
        }
      },
      stoponwarning: {
        options: {
          stoponwarning: true
        },
        files: {
          'tmp/stoponwarning': [
            'test/fixtures/missing-doctype.html',
            'test/fixtures/missing-charset.html',
            'test/fixtures/cols-redundant.html'
          ]
        }
      },
      showallerrors: {
        options: {
          showallerrors: true
        },
        files: {
          'tmp/stoponwarning': [
            'test/fixtures/missing-doctype.html',
            'test/fixtures/missing-charset.html',
            'test/fixtures/cols-redundant.html'
          ]
        }
      },
      showallerrorswithstop: {
        options: {
          showallerrors: true,
          stoponwarning: true
        },
        files: {
          'tmp/stoponwarning': [
            'test/fixtures/missing-doctype.html',
            'test/fixtures/missing-charset.html',
            'test/fixtures/cols-redundant.html'
          ]
        }
      },
      stoponboth: {
        options: {
          stoponwarning: true,
          stoponerror: true
        },
        files: {
          'tmp/stoponboth': 'test/fixtures/**.html'
        }
      },
      pass: {
        files: {
          'tmp/pass': 'test/fixtures/pass.html'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: 'test/*_test.js'
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then lint,
  // then test the result.
  grunt.registerTask('test', ['clean', 'eslint', 'nodeunit']);

  // By default, run all tests.
  grunt.registerTask('default', 'test');
};
