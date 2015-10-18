app.controller('MenuController', function($scope, $state, $location) {
	$scope.goToMap = function(){
	      $state.go('map');
	};
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

			var zValue = scope.$eval(attrs.zoom);
			var lat = scope.$eval(attrs.lat);
			var lng = scope.$eval(attrs.lng);


			var myLatlng = new google.maps.LatLng(lat,lng),
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