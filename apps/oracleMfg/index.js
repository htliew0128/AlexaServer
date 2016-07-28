'use strict';
module.change_code = 1;
var _ = require('lodash');
var alexa = require( 'alexa-app' );
var app = new alexa.app( 'oracle-mfg' );
var OracleDataHelper = require('./OracleDataHelper');


app.launch( function( request, response ) {
	var prompt = 'Welcome to Oracle Manufacturing. For exception information, say get latest exception';
    response.say(prompt).reprompt(prompt).shouldEndSession(false);
} );

app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};

app.intent('getException',
  {
    "slots":{}
	,"utterances":[ 
		"please get me the latest exeception",
		"get me the latest exeception",
		"get latest exception",
		"get exception"]
  },
  function(request,response) {
	  
	//var latestDate = new Date().toISOString().replace(/\..+/, '');  
	var now = new Date();
	var durationInMinutes = 20;
    now.setMinutes(now.getMinutes() - durationInMinutes);
    var jsonDate = now.toJSON().replace(/\..+/, '');
	console.log(jsonDate);
  
	//var currentDate = jsonDate;
	var mfgHelper = new OracleDataHelper();
	
	mfgHelper.requestException(jsonDate).then(function(exceptionOutput) {
        //console.log(exceptionOutput);
        response.say(mfgHelper.formatExceptionOutput(exceptionOutput)).send();
      }).catch(function(err) {
        console.log(err.statusCode);
        var prompt = 'There is no exception on shop floor';
        response.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
      });
      return false;
  }
);

module.exports = app;

