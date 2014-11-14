/*
 * grunt-bootlint
 * https://github.com/zacechola/grunt-bootlint
 *
 * Copyright (c) 2014 Zac Echola
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    bootlint: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': [
            'test/fixtures/**.html',
          ]
        }
      },
      relaxerror: {
        options: {
          relaxerror: ['E001'],
        },
        files: {
          'tmp/relaxerror': [
            'test/fixtures/missing-doctype.html',
            'test/fixtures/missing-charset.html',
          ]
        }
      },
     stoponerror: {
        options: {
          stoponerror: true,
        },
        files: {
          'tmp/stoponerror': [
            'test/fixtures/missing-doctype.html',
            'test/fixtures/missing-charset.html',
            'test/fixtures/cols-redundant.html',
          ]
        }
      },
      stoponwarning: {
        options: {
          stoponwarning: true,
        },
        files: {
          'tmp/stoponwarning': [
            'test/fixtures/missing-doctype.html',
            'test/fixtures/missing-charset.html',
            'test/fixtures/cols-redundant.html',
          ]
        }
      },
      stoponboth: {
        options: {
          stoponwarning: true,
          stoponerror: true,
        },
        files: {
          'tmp/stoponboth': [
            'test/fixtures/**.html',
          ]
        }
      },
      pass: {
        options: {},
        files: {
          'tmp/pass': 'test/fixtures/pass.html'
        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'bootlint', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
