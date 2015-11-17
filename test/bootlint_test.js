'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.bootlint = {
  defaultOptions: function(test) {
    test.expect(3);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:defaultOptions', '--no-color']
    }, function(err, result) {
      test.ok(result.stdout.indexOf('test/fixtures/missing-doctype.html') >= 0,
        'Should print file path');
      test.ok(result.stdout.indexOf('Document is missing a DOCTYPE declaration') >= 0,
        'Should warn about missing a DOCTYPE');
      test.ok(result.stdout.indexOf('9 lint errors found across 5 files') >= 0,
        'Should print number of lint errors and files');
      test.done();
    });
  },
  relaxerror: function(test) {
    test.expect(4);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:relaxerror', '--no-color']
    }, function(err, result) {
      test.ok(result.stdout.indexOf('E001') === -1,
        'Should not warn about missing a DOCTYPE');
      test.ok(result.stdout.indexOf('W001') >= 0,
        'Should warn about missing charset');
      test.ok(result.stdout.indexOf('W005') === -1,
        'Should not warn about missing jQuery');
      test.ok(result.stdout.indexOf('1 lint error found across 3 files') >= 0,
        'Should print correct number of lint errors and files');
      test.done();
    });
  },
  stoponerror: function(test) {
    test.expect(2);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:stoponerror', '--no-color']
    }, function(err, result) {
      test.ok(result.stdout.indexOf('E001') >= 0,
        'Should warn about missing a DOCTYPE');
      test.ok(result.stdout.indexOf('W001') === -1,
        'Should not warn about anything after E001');
      test.done();
    });
  },
  stoponwarning: function(test) {
    test.expect(3);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:stoponwarning', '--no-color']
    }, function(err, result) {
      test.ok(result.stdout.indexOf('E001') >= 0,
        'Should display error of missing a DOCTYPE');
      test.ok(result.stdout.indexOf('W001') >= 0,
        'Should warn about W001');
      test.ok(result.stdout.indexOf('E029') === -1,
        'Should not warn about anything after W001');
      test.done();
    });
  },
  stoponboth: function(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:stoponboth', '--no-color']
    }, function(err, result) {
      test.ok(result.stdout.indexOf('E001') === -1,
        'Should not warn about E001');
      test.done();
    });
  },
  showallerrors: function(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:showallerrors', '--no-color']
    }, function(err, result) {
      test.ok(result.stdout.indexOf('8 lint errors found across 3 files. Use --force to continue.') >= 0,
        'Should show all errors before hard fail.');
      test.done();
    });
  },
  showallerrorswithstop: function(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:showallerrorswithstop', '--no-color']
    }, function(err, result) {
      test.ok(result.stdout.indexOf('8 lint errors found across 3 files. Use --force to continue.') >= 0,
        'Should show all errors before hard fail even if stopon* is set.');
      test.done();
    });
  },
  pass: function(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:pass', '--no-color']
    }, function(err, result) {
      test.ok(result.stdout.indexOf('1 file lint free.') >= 0,
        'Should print correct number of lint free files');
      test.done();
    });
  }
};
