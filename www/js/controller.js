app.controller('RestaurantController', function($scope, $state, $location) {
	$scope.goToMap = function(){
	      $state.go('map');
	};

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
})

app.controller('MapController', function($scope, $firebase, $ionicPopup, $state, $location) {
	$scope.user = {};

	var firebaseObj = new Firebase("https://crackling-torch-9931.firebaseio.com//MapDetails");
	var fb = $firebase(firebaseObj);

	$scope.goToRestaurant = function() {
		$state.go('restaurant')
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

			var initialLocation = new google.maps.LatLng(0,0);
			
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					map.setCenter(initialLocation);
				}, function() {
					handleNoGeolocation(true);
				});
			}
			// Browser doesn't support Geolocation
			else {
				handleNoGeolocation(false);
			}
			
			//var latitude = position.coords.latitude;
			//var longitude = position.coords.longitude;
			
			var zValue = scope.$eval(attrs.zoom);
			//var lat = latitude;//scope.$eval(attrs.lat);
			//var lng = longitude;//scope.$eval(attrs.lng);


			//var myLatlng = new google.maps.LatLng(lat,lng),
			var myLatlng = initialLocation,
			mapOptions = {
				zoom: zValue,
				center: myLatlng
			},
			map = new google.maps.Map(element[0],mapOptions),
			marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				draggable:true
			});

			google.maps.event.addListener(marker, 'dragend', function(evt) {
				console.log('Current Latitude:',evt.latLng.lat(),'Current Longitude:',evt.latLng.lng());
			});

			google.maps.event.addListener(marker, 'dragend', function(evt){
				scope.$parent.user.latitude = evt.latLng.lat();
				scope.$parent.user.longitude = evt.latLng.lng();
				scope.$apply();
			});

		}
	};
});
