'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'http://slc11lrw.us.oracle.com:7824/manufacturingApi/resources/11.1.13/productionExceptions?ReportedDate=';

function OracleDataHelper() {
}

OracleDataHelper.prototype.requestException = function(currentDate) {
  return this.getException(currentDate).then(
    function(response) {
      console.log('success - received exception request for ' + currentDate);
      return response.body;
    }
  );
};

OracleDataHelper.prototype.getException = function(currentDate) {
  var uname = 'MFG_QA';
  var pword = 'Welcome1';
  var options = {
    method: 'GET',
    uri: ENDPOINT + currentDate,
    resolveWithFullResponse: true,
    json: true,
	headers: {
     'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    } 
  };
  return rp(options);
};

OracleDataHelper.prototype.formatExceptionOutput = function(exceptionOutput) {
  console.log('output 1: ' + exceptionOutput.items[0].ExceptionType);
  var template = _.template('The latest exception is a ${exceptionType} exception. This exception will have a downtime of ${downTime} minutes.')({
    exceptionType: exceptionOutput.items[0].ExceptionType,
    downTime: exceptionOutput.items[0].ExpectedDowntimeInMinutes
  });
  
  console.log('output 2: ' + template)
  return template;
};

module.exports = OracleDataHelper;