/*
 * grunt-bootlint
 * https://github.com/zacechola/grunt-bootlint
 *
 * Copyright (c) 2014 Zac Echola
 * Licensed under the MIT license.
 * Extensions Ashok G
 * Extended CheckStyle style XML reporting, Pipe Delimited '|' CSV reporting & .tap format for Jenkins build automation.
 * 
 */

'use strict';

module.exports = function(grunt) {
  var path = require('path');
  var bootlint = require('bootlint');
  var chalk = require('chalk');


  grunt.registerMultiTask('bootlint', 'An HTML linter for Bootstrap projects', function() {
    var options = this.options({
      stoponerror: false,
      stoponwarning: false,
      relaxerror: [],
      reportXML: null,
      reportCSV: null,
      reportTAP: null
    });

    var totalErrCount = 0;
    var totalFileCount = 0;
    var wcount = 0;
    
    
    var reportXML = options.reportXML;
    delete options.reportXML;

    var reportCSV = options.reportCSV;
    delete options.reportCSV;
   
    var reportTAP = options.reportTAP;
    delete options.reportTAP;
    
      var output = '';
    var xml ='<?xml version="1.0" encoding="utf-8"?>\r\n<checkstyle>\r\n';
    var csv ='File|Line Number|Error Code|Severity\r\n';
    var tap = "#Whole List Of BootLint Tests \r\n";
    if (reportXML) {
      grunt.util.hooker.hook(process.stdout, 'write', {
        pre: function(out) {
          output += out;
          return grunt.util.hooker.preempt();
        }
      });
    }

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
	xml +='	<file name="'+filepath+'" totalerrors="'+totalErrCount+'">\r\n';
        
        var src = grunt.file.read(filepath);
        var reporter = function (lint) {
          var isError = (lint.id[0] === 'E');
          var isWarning = (lint.id[0] === 'W');
          var lintId = (isError) ? chalk.bgGreen.white(lint.id) : chalk.bgRed.white(lint.id);
          var output = false;
	

          if (lint.elements) {
		
            lint.elements.each(function (_, element) {
              var loc = element.startLocation;
              grunt.log.warn(filepath + ":" + (loc.line + 1) + ":" + (loc.column + 1), lintId, lint.message);
		var errline= loc.line + 1;
		if(lint.id[0]=='E') { var severity = 'Error'; var tapsev = 'not ok';  }
		if(lint.id[0]=='W') { var severity = 'Warning'; var tapsev = 'ok'; wcount++; }
		xml +='<error line="'+ errline +'" errorcode="'+lint.id+'" message="'+lint.id +' '+lint.message+'" severity="'+severity+'" source="com.bootlint"/>\r\n';
                csv +=filepath+'|'+errline+'|'+lint.id+'|'+lint.message+'|'+severity+'\r\n';
                
              totalErrCount++;
              tap += tapsev + ' ' + totalErrCount + ' ' + filepath + ' -  Bootlint ' + lint.id + ' : ' + lint.message + '\r\n'; 
              output = true;
            });

          }
          if (!output) {
            grunt.log.warn(filepath + ":", lintId, lint.message);
                        lint.elements.each(function (_, element) {

                          var loc = element.startLocation;

            var errline= loc.line + 1
		if(lint.id[0]=='E') { var severity = 'Error';  var tapsev = 'not ok'; }
		if(lint.id[0]=='W') { var severity = 'Warning';  var tapsev = 'ok'; wcount++; }			
		xml +='<error errcode="'+lint.id+'" message="'+lint.message+'" source="com.bootlint" />\r\n';
                csv +=filepath+'|'+errline+'|'+lint.id+'|'+lint.message+'|'+severity+'\r\n';
            totalErrCount++;
            tap += tapsev + ' ' + totalErrCount + ' ' + filepath + ' -  Bootlint ' + lint.id + ' : ' + lint.message + '\r\n'; 
          });
          
          }
          console.log((isError && options.stoponerror) || (isWarning && options.stoponwarning));
          if ((isError && options.stoponerror) || (isWarning && options.stoponwarning)) {
            grunt.fail.warn('Too many bootlint errors.');
          }


        };

        bootlint.lintHtml(src, reporter, options.relaxerror);
        totalFileCount++;
xml +='</file>\r\n';
csv +='|\r\n|'+'Total Files'+'|'+totalFileCount+'\r\n|Total Errors'+totalErrCount;
      });
xml +='</checkstyle>'; 
var newWcnt = totalErrCount - wcount;
tap += '\r\n1..'+totalErrCount+'\r\n\r\n# Total Tests '+totalErrCount+'\r\n# pass '+wcount+'\r\n# fail '+newWcnt;

      if (totalErrCount > 0) {
        grunt.log.writeln().fail(totalErrCount + " lint error(s) found across " + totalFileCount + " file(s).");
        grunt.log.writeln().fail('For details, look up the lint problem IDs in the Bootlint wiki: https://github.com/twbs/bootlint/wiki');
      } else {
        grunt.log.ok(totalFileCount + ' file(s) lint free.');
      }
      if (reportXML) {
        grunt.util.hooker.unhook(process.stdout, 'write');
        reportXML = grunt.template.process(reportXML);
        var destination = path.dirname(reportXML);
        if (!grunt.file.exists(destination)) {
          grunt.file.mkdir(destination);
        }
        grunt.file.write(reportXML, xml);
        grunt.log.ok('XML Report "' + reportXML + '" created.');
      }
      if (reportCSV) {
        grunt.util.hooker.unhook(process.stdout, 'write');
        reportCSV = grunt.template.process(reportCSV);
        var destination = path.dirname(reportCSV);
        if (!grunt.file.exists(destination)) {
          grunt.file.mkdir(destination);
        }
        grunt.file.write(reportCSV, csv);
        grunt.log.ok('Report "' + reportCSV + '" created.');
      }
      

      if (reportTAP) {
        grunt.util.hooker.unhook(process.stdout, 'write');
        reportTAP = grunt.template.process(reportTAP);
        var destination = path.dirname(reportTAP);
        if (!grunt.file.exists(destination)) {
          grunt.file.mkdir(destination);
        }
        grunt.file.write(reportTAP, tap);
        grunt.log.ok('Tap Report "' + reportTAP + '" created.');
      }

    });
  });

};
