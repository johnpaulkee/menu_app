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
		if (authData && !menuItem.loadFailed) {
			var uids = getUidArray(menuItem.uids);
			if (uids.indexOf(authData.uid) === -1) {
				uids.push(authData.uid);
				var updatedItem = {
					itemName: menuItem.itemName,
					uids: uids,
					itemDescription: menuItem.itemDescription,
					itemPrice: menuItem.itemPrice
				};
				console.log(updatedItem);
				ref.child('menuItems').child(menuItem.itemName).set(updatedItem);
			}
		}
		else {
			alert("You aren't signed in!");
		}
	}

	console.log($state.params.id);

	ref.on('value', function(snapshot) {
			var results = snapshot.exportVal();
			console.log(results);
			var timeoutId;
			if (results) {
				if (timeoutId) {
					window.clearTimeout(timeoutId);
				}
				var restaurantName = $state.params.id;
				var menuItems = results.menuItems;
				var sortedMenuItems = sortObject(menuItems);
				for (item in sortedMenuItems) {
					sortedMenuItems[item].numLikes = getUidArray(sortedMenuItems[item].uids).length;
				}
				console.log(menuItems);

				decodeHTMLStrings(menuItems);

				$scope.restaurantName = restaurantName;
				$scope.menuItems = sortedMenuItems;
				console.log(sortedMenuItems);
				$scope.$evalAsync();
			}
			else {
				requestsRef = new Firebase('https://shining-fire-3905.firebaseio.com/requests');
				requestsRef.push($state.params.id);
				console.log("Requested " + $state.params.id);
				timeoutId = window.setTimeout(function() {
					$scope.menuItems = [ {
						itemName: "Menu Load Failed",
						uids: [],
						itemDescription: "The menu failed to load.",
						itemPrice: 3.49,
						loadFailed: true
					}];
					$scope.$evalAsync();
				}, 5000);
			}
	});

	$scope.goBack = function() {
	  $ionicHistory.goBack();
	}

	ionicMaterialInk.displayEffect();

})
