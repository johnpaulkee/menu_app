var Firebase = require("firebase");
var ref = new Firebase('https://shining-fire-3905.firebaseio.com/Restaurants/');

ref.child('requests').on('child_added', function (snapshot) {
    //Make request and pass response to parseMenu()
});

function parseMenu(venues) {
    for (var k = 0;k < venues.venues.length;k++) {
        var data = venues.venues[k];
        var menuItems = {};
        if (!data.menus) {
            continue;
        }
        for (var j = 0;j < data.menus.length;j++) {
            var contents = data.menus[j].sections[0].subsections[0].contents;
            for (var i = 0;i < contents.length; i++) {
                if (contents[i].type === "ITEM"){
                    var itemName = contents[i].name.replace(/\./g,'%2E').replace(/\//g,'%2F');
                    menuItems[itemName] = {
                        itemName: itemName,
                        itemScore: 0
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
