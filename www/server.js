var Firebase = require("firebase");
var ref = new Firebase('https://shining-fire-3905.firebaseio.com/');
console.log("Started server...");
ref.child('requests').on('child_added', function (snapshot) {
    //Make request and pass response to parseMenu()
	console.log(snapshot);
	var request = require('request');
	request.post(
		{
			url: 'https://api.locu.com/v2/venue/search',
			body: JSON.stringify({
				api_key: "bdeed6bf5eae32da59856986e058743fb11be970",
				fields: ["name", "menus"],
				venue_queries: [{
					"name": snapshot.val()
				}]
			})
		},
		function (error, response, body) {
			console.log(body);
			parseMenu(JSON.parse(body));
			ref.child("requests").child(snapshot.key()).remove();
		}
	);
});

function parseMenu(response) {
    for (var k = 0;k < response.venues.length;k++) {
        var data = response.venues[k];
        var menuItems = {};
        if (data.menus) {
            for (var j = 0;j < data.menus.length;j++) {
                if (data.menus[j].sections[0].subsections[0]) {
                    var contents = data.menus[j].sections[0].subsections[0].contents;
                        for (var i = 0;i < contents.length; i++) {
                            if (contents[i].type === "ITEM"){
                                var itemName = contents[i].name.replace(/\./g,'%2E').replace(/\//g,'%2F');
                                menuItems[itemName] = {
                                    itemName: itemName,
                                    itemScore: 0,
									itemPrice: contents[i].price,
									itemDescription: contents[i].description
                                }
                            }
                        }
                    }

                    var restaurant = {
                        menuItems: menuItems,
                        restuarantName: data.name.replace(/\./g,'%2E').replace(/\\/g,'%5C')
                    }

                    var ref = new Firebase('https://shining-fire-3905.firebaseio.com/Restaurants/' + restaurant.restuarantName);
                    ref.set(restaurant);
                }
        }
    }
}
