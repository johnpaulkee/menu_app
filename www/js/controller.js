app.controller('MenuController', function($scope, $state, $location) {
	var ref = new Firebase('https://shining-fire-3905.firebaseio.com/Restaurants');

	$scope.goToMap = function(){
	      $state.go('map');
	};

	$scope.likeItem = function(menuItem, restaurantName) {
		menuItem.itemScore++;
		var updatedItem = {
			itemName: menuItem.itemName,
			itemScore: menuItem.itemScore
		};
		console.log(menuItem.itemScore);
		ref.child(restaurantName).child("menuItems").child(menuItem.itemName).set(updatedItem);
	}

	console.log($state.params.name);

	ref.once('value', function(snapshot) {
			var results = snapshot.exportVal();
			console.log(results[$state.params.name]);
			if (results[$state.params.name]) {
				var menuItems = results[$state.params.name].menuItems;
				var restaurantName = results[$state.params.name].restaurantName;
				$scope.menuItems = menuItems;
				$scope.restaurantName = restaurantName;
				$scope.$apply();
			}
	});
})

app.controller('MapController', function($scope, $firebase, $ionicPopup, $state, $location) {
	$scope.user = {};

	var firebaseObj = new Firebase("https://crackling-torch-9931.firebaseio.com//MapDetails");
	var fb = $firebase(firebaseObj);

	$scope.goToMenu = function() {
		$state.go('menu')
	}

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

})

app.directive('map', function() {
	return {
		restrict: 'A',
		link:function(scope, element, attrs){
<<<<<<< HEAD

			var initialLocation = new google.maps.LatLng(0,0);

=======

			var initialLocation;

>>>>>>> d661a3c2e8429cdf0f2a11fb33e51bf9609f34cb
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
			// Browser doesn't support Geolocation
			else {
				handleNoGeolocation(false);
			}
<<<<<<< HEAD

			//var latitude = position.coords.latitude;
			//var longitude = position.coords.longitude;

=======

>>>>>>> d661a3c2e8429cdf0f2a11fb33e51bf9609f34cb
			var zValue = scope.$eval(attrs.zoom);
			var myLatlng = initialLocation,
			mapOptions = {
				zoom: zValue,
				center: myLatlng
			},
			map = new google.maps.Map(element[0],mapOptions);

		}
	};
});
