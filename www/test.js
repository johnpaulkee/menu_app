
var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/json',
        'Access-Control-Allow-Origin' : '*'
    });
	var request = require('request');
	request.post(
		{
			url: 'https://api.locu.com/v2/venue/search',
			body: JSON.stringify({
				api_key: "bdeed6bf5eae32da59856986e058743fb11be970",
				fields: ["name", "menus"],
				venue_queries: [{
					"locu_id": "59ee96642f3f073ef03e"
				}]
			})
		},
		function (error, response2, body) {
			response.end(body);
		}
	);
	
}).listen(8080);

console.log("Running server at localhost:8080");