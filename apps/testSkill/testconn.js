// Require the HTTPS module
var https = require('http');
var uname = 'MFG_QA';
var pword = 'Welcome1';

// Create an options object, with request options
var options = {
    host: 'maps.googleapis.com',
    method: 'GET',
    path: '/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=false'/*,
	headers: {
     'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64'),
	 'Content-Type': 'application/json; charset=utf-8'
   } */
};

// Create a ClientRequest object
var request = https.request(options,
    function (response) {

    // Listen for the data event
    response.on('data', function (data) {
        console.log("Connected server ");
    }); 
});

console.log("End test Connection");
request.end();