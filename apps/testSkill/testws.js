var uname = 'MFG_QA';
var pword = 'Welcome1';
var http = require('http');
 
var options = {
    host: 'slc11lrw.us.oracle.com',
    port: 7824,
    path: '/manufacturingApi/resources/11.1.13/productionExceptions?ReportedDate=2016-03-05T00:00:00',
    method: 'GET',
    headers: {
     'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64'),
	 'Content-Type': 'application/json; charset=utf-8'
   }         
};
 
//console.info(options);
var request = http.request(options, function(res){
	//console.info("statusCode: ", res.statusCode);
    //console.info(res.headers);
    var responseString = '';
	res.setEncoding('utf8');
    res.on('data', function(chunk) {
		//console.info('In request data webservice');
        //console.info(chunk);
        responseString += chunk;
    });
    res.on('end', function() {
		//console.info('In request end webservice');
		var jsonData = JSON.parse(responseString);
		console.log('Output -' + jsonData.items[0].ItemNumber);
		console.log('Output -' + jsonData.items[0].ItemDescription);
		console.log('Output -' + jsonData.items[0].ExceptionType);
        //console.info(parsed);
    });
});

request.on('error', function(e) {
		console.log('In error ');
        console.log("Got error: " + e.message);
});

request.end();
console.log('Done with webservice call');
