app.controller('MenuController', function($scope, $state, $location, ionicMaterialInk) {
	console.log('Controller opened');
	var ref = new Firebase('https://shining-fire-3905.firebaseio.com/Restaurants/' +
						   $state.params.id);

	$scope.goToMap = function() {
	      $state.go('map');
	};

	$scope.likeItem = function(menuItem, restaurantName) {
		menuItem.itemScore++;
		var updatedItem = {
			itemName: menuItem.itemName,
			itemScore: menuItem.itemScore,
			itemDescription: menuItem.itemDescription,
			itemPrice: menuItem.itemPrice
		};
		console.log(updatedItem);
		ref.child('menuItems').child(menuItem.itemName).set(updatedItem);
	}

	console.log($state.params.id);

	ref.on('value', function(snapshot) {
			var results = snapshot.exportVal();
			console.log(results);
			if (results) {
				var restaurantName = $state.params.id;
				var menuItems = results.menuItems;
				var sortedMenuItems = sortObject(menuItems);
				console.log(menuItems);

				$scope.restaurantName = restaurantName;
				$scope.menuItems = sortedMenuItems;
				console.log(sortedMenuItems);
				$scope.$evalAsync();
			}
			else {
				requestsRef = new Firebase('https://shining-fire-3905.firebaseio.com/requests');
				requestsRef.push($state.params.id);
				console.log("Requested " + $state.params.id);
			}
	});

	$scope.goToMap = function(){
	      $state.go('map');
	};

	ionicMaterialInk.displayEffect();

})
