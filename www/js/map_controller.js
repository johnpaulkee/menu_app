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
					var service = new google.maps.places.PlacesService(map);
						service.nearbySearch({
						location: initialLocation,
						radius: 500,
						types: ['restaurant']
					}, processResults);
					
						function processResults(results, status, pagination) {
						  if (status !== google.maps.places.PlacesServiceStatus.OK) {
							return;
						  } else {
							createMarkers(results);

							if (pagination.hasNextPage) {
							  var moreButton = document.getElementById('more');
							if(moreButton){
							  moreButton.disabled = false;

							  moreButton.addEventListener('click', function() {
								moreButton.disabled = true;
								pagination.nextPage();
							  });
							  }
							}
						  }
						}
						
						function createMarkers(places) {
					  var bounds = new google.maps.LatLngBounds();
					  var placesList = document.getElementById('places');

					  for (var i = 0, place; place = places[i]; i++) {
						var image = {
						  url: place.icon,
						  size: new google.maps.Size(71, 71),
						  origin: new google.maps.Point(0, 0),
						  anchor: new google.maps.Point(17, 34),
						  scaledSize: new google.maps.Size(25, 25)
						};

						var marker = new google.maps.Marker({
						  map: map,
						  icon: image,
						  title: place.name,
						  position: place.geometry.location
						});

						marker.addListener('click', function() {
						 window.location.href = "testHTML.html";  
					  });
						if(placesList){
						placesList.innerHTML += '<li id="placeTab">' + place.name + '</li>';
						}

						bounds.extend(place.geometry.location);
					  }
					  map.fitBounds(bounds);
					  
					  if(document.getElementById('placeTab')){
						google.maps.event.addDomListener(document.getElementById('placeTab'), 'click', function(element) {
						window.alert('Map was clicked!');
						});
						}
					}
						
					
					
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
