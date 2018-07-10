'use strict';

const grunt = require('grunt');

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
  defaultOptions(test) {
    test.expect(3);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:defaultOptions', '--no-color']
    }, (err, result) => {
      test.ok(result.stdout.includes('test/fixtures/missing-doctype.html'),
        'Should print file path');
      test.ok(result.stdout.includes('Document is missing a DOCTYPE declaration'),
        'Should warn about missing a DOCTYPE');
      test.ok(result.stdout.includes('9 lint errors found across 5 files'),
        'Should print number of lint errors and files');
      test.done();
    });
  },
  relaxerror(test) {
    test.expect(4);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:relaxerror', '--no-color']
    }, (err, result) => {
      test.ok(!result.stdout.includes('E001'),
        'Should not warn about missing a DOCTYPE');
      test.ok(result.stdout.includes('W001'),
        'Should warn about missing charset');
      test.ok(!result.stdout.includes('W005'),
        'Should not warn about missing jQuery');
      test.ok(result.stdout.includes('1 lint error found across 3 files'),
        'Should print correct number of lint errors and files');
      test.done();
    });
  },
  stoponerror(test) {
    test.expect(2);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:stoponerror', '--no-color']
    }, (err, result) => {
      test.ok(result.stdout.includes('E001'),
        'Should warn about missing a DOCTYPE');
      test.ok(!result.stdout.includes('W001'),
        'Should not warn about anything after E001');
      test.done();
    });
  },
  stoponwarning(test) {
    test.expect(3);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:stoponwarning', '--no-color']
    }, (err, result) => {
      test.ok(result.stdout.includes('E001'),
        'Should display error of missing a DOCTYPE');
      test.ok(result.stdout.includes('W001'),
        'Should warn about W001');
      test.ok(!result.stdout.includes('E029'),
        'Should not warn about anything after W001');
      test.done();
    });
  },
  stoponboth(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:stoponboth', '--no-color']
    }, (err, result) => {
      test.ok(!result.stdout.includes('E001'),
        'Should not warn about E001');
      test.done();
    });
  },
  showallerrors(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:showallerrors', '--no-color']
    }, (err, result) => {
      test.ok(result.stdout.includes('8 lint errors found across 3 files. Use --force to continue.'),
        'Should show all errors before hard fail.');
      test.done();
    });
  },
  showallerrorswithstop(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:showallerrorswithstop', '--no-color']
    }, (err, result) => {
      test.ok(result.stdout.includes('8 lint errors found across 3 files. Use --force to continue.'),
        'Should show all errors before hard fail even if stopon* is set.');
      test.done();
    });
  },
  pass(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:pass', '--no-color']
    }, (err, result) => {
      test.ok(result.stdout.includes('1 file lint free.'),
        'Should print correct number of lint free files');
      test.done();
    });
  }
};
