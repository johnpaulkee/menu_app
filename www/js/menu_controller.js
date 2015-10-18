app.controller('MenuController', function($scope, $state, $location, $ionicPopup, ionicMaterialInk) {
	console.log('Controller opened');
	var ref = new Firebase('https://shining-fire-3905.firebaseio.com/Restaurants/' +
						   $state.params.id);

	$scope.goToMap = function() {
	      $state.go('map');
	};

	$scope.likeItem = function(menuItem, restaurantName) {
		var loginRef = new Firebase('https://shining-fire-3905.firebaseio.com/');
		var authData = loginRef.getAuth();
		if (authData) {
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
		else {
			alert("You aren't signed in!");
		}
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
				window.setTimeout(function () {
					$ionicPopup.alert({
					  title: 'Failed to fetch menu',
					  template: 'The menu for this restaurant is not available.'
					});
				}, 5000);
			}
	});

	$scope.goToMap = function(){
	      $state.go('map');
	};

	ionicMaterialInk.displayEffect();

})
