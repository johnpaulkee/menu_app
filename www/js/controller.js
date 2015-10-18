app.controller('MenuController', function($scope, $state, $location, ionicMaterialInk) {
	console.log($state.params.name);
	var ref = new Firebase('https://shining-fire-3905.firebaseio.com/Restaurants');
	ref.once('value', function(snapshot) {
			var results = snapshot.exportVal();
			console.log(results[$state.params.name]);
			if (results[$state.params.name]) {
				var menuItems = results[$state.params.name].menuItems;
				$scope.menuItems = menuItems;
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
		link:function(scope, element, attrs){
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