app.controller('MenuController', function($scope, $state, $location, ionicMaterialInk) {
	console.log('Controller opened');
	var ref = new Firebase('https://shining-fire-3905.firebaseio.com/Restaurants/' +
						   $state.params.name);

	$scope.goToMap = function() {
	      $state.go('map');
	};

	$scope.likeItem = function(menuItem, restaurantName) {
		menuItem.itemScore++;
		var updatedItem = {
			itemName: menuItem.itemName,
			itemScore: menuItem.itemScore
		};
		console.log(updatedItem);
		ref.child('menuItems').child(menuItem.itemName).set(updatedItem);
	}

	console.log($state.params.name);

	ref.on('value', function(snapshot) {
			var results = snapshot.exportVal();
			console.log(results);
			if (results) {
				var restaurantName = $state.params.name;
				var menuItems = results.menuItems;
				var sortedMenuItems = sortObject(menuItems);
				console.log(menuItems);

				$scope.restaurantName = restaurantName;
				$scope.menuItems = sortedMenuItems;
				$scope.$evalAsync();
			}
			else {
				requestsRef = new Firebase('https://shining-fire-3905.firebaseio.com/requests');
				requestsRef.push($state.params.name);
			}
	});

	$scope.goToMap = function(){
	      $state.go('map');
	};

	ionicMaterialInk.displayEffect();

})
