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
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(4);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:default_options', '--no-color'],
    }, function(err, result) {
      test.ok(result.stdout.indexOf("Validation started for") >= 0,
        'Should print start msg');
      test.ok(result.stdout.indexOf("test/fixtures/missing-doctype.html") >= 0,
        'Should print file path');
      test.ok(result.stdout.indexOf("Document is missing a DOCTYPE declaration") >= 0,
        'Should warn about missing a DOCTYPE');
      test.ok(result.stdout.indexOf("2 lint errors found") >= 0,
        'Should print number of lint errors');
      test.done();
    });
  },
  custom_options: function(test) {
    test.expect(3);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:custom_options', '--no-color'],
    }, function(err, result) {
      test.ok(result.stdout.indexOf("Document is missing a DOCTYPE declaration") === -1,
        'Should not warn about missing a DOCTYPE');
      test.ok(result.stdout.indexOf("is OK") >= 0,
        'Should print filepath is OK!');
      test.ok(result.stdout.indexOf("1 lint errors found") >= 0,
        'Should print correct number of lint errors');
      test.done();
    });
  },
  pass: function(test) {
    test.expect(2);
    grunt.util.spawn({
      grunt: true,
      args: ['bootlint:pass', '--no-color'],
    }, function(err, result) {
      test.ok(result.stdout.indexOf("is OK") >= 0,
        'Should print filepath is OK!');
      test.ok(result.stdout.indexOf("All Done!") >= 0,
        'Should print All Done! message');
      test.done();
    });
  },
};
