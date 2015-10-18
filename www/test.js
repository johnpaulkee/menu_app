var request = require('request');
request.post(
	{
		url: 'https://api.locu.com/v2/venue/search',
		body: JSON.stringify({
			api_key: "bdeed6bf5eae32da59856986e058743fb11be970",
			fields: ["name", "menus"],
			venue_queries: [    {      "locu_id": "59ee96642f3f073ef03e"    }  ]
		})
	},
	function (error, response, body) {
		console.log(body);
	}
);
