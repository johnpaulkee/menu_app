app.controller('MenuController', function($scope, $state, $location, ionicMaterialInk) {
	var ref = new Firebase('https://shining-fire-3905.firebaseio.com/Restaurants');

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
		ref.child(restaurantName).child("menuItems").child(menuItem.itemName).set(updatedItem);
	}

	console.log($state.params.name);

	ref.on('value', function(snapshot) {
			var results = snapshot.exportVal();
			console.log(results[$state.params.name]);
			if (results[$state.params.name]) {
				var restaurantName = results[$state.params.name].restaurantName;
				var menuItems = results[$state.params.name].menuItems;
				var sortedMenuItems = sortObject(menuItems);
				console.log(menuItems);

				$scope.restaurantName = restaurantName;
				$scope.menuItems = sortedMenuItems;
				$scope.$apply();
			}
	});
	$scope.goToMap = function(){
	      $state.go('map');
	};

	ionicMaterialInk.displayEffect();

})
