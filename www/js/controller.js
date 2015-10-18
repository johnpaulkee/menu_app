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

app.controller('LoginController', function($scope, $firebase, $ionicPopup, $state, $location, ionicMaterialInk) {

	$scope.goToMenu = function() {
		$state.go('menu')
	};

	$scope.goToMap = function() {
		$state.go('map')
	};

	ionicMaterialInk.displayEffect();
})

app.controller('MapController', function($scope, $firebase, $ionicPopup, $state, $location, ionicMaterialInk) {
	$scope.user = {};
	var firebaseObj = new Firebase("https://crackling-torch-9931.firebaseio.com/MapDetails");
	var fb = $firebase(firebaseObj);
	$scope.goToMenu = function() {
		$state.go('menu')
	};

	$scope.goToLogin = function() {
		$state.go('login')
	};

	$scope.saveDetails = function() {
		var lat = $scope.user.latitude;
		var lgt = $scope.user.longitude;
		var des = $scope.user.desc;

    // Code to write to Firebase will be here
    fb.$push({
    	latitude: lat,
    	longitude: lgt,
    	description: des
    }).then(function(ref) {
    	$scope.user = {};
    	$scope.showAlert();
    }, function(error) {
    	console.log("Error:", error);
    });
	}

	$scope.showAlert = function() {
		$ionicPopup.alert({
			title: 'Map',
			template: 'Your location has been saved!!'
		});
	};

	ionicMaterialInk.displayEffect();
})

app.directive('map', function() {
	return {
		restrict: 'A',
		link:function(scope, element, attrs) {
			var initialLocation;
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					map.setCenter(initialLocation);
					var marker = new google.maps.Marker({
						position: initialLocation,
						map: map
					});
				}, function() {
					handleNoGeolocation(true);
				});
			}
			else {
				handleNoGeolocation(false);
			}
			var myLatlng = initialLocation,
			mapOptions = {
				zoom: 15,
				center: myLatlng,
				disableDefaultUI:true,
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP],
				}
			},
			map = new google.maps.Map(element[0],mapOptions);
		}
	};
});

function sortObject(menuItems) {
	var sortedMenu = [];
	for (var item in menuItems) {
		sortedMenu.push([menuItems[item].itemName, menuItems[item].itemScore]);
	}
	console.log(sortedMenu.length);
	sortedMenu.sort(function(a, b) {return b[1] - a[1]});
	var sortedMenuItems = {};
	for (var i = 0; i < sortedMenu.length; i++) {
		sortedMenuItems[sortedMenu[i][0]] = {
			itemName: sortedMenu[i][0],
			itemScore: sortedMenu[i][1]
		}
	}
	return sortedMenuItems;
}
