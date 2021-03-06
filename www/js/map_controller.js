app.controller('MapController', function($scope, $firebase, $ionicPopup, $state, $location, ionicMaterialInk) {
    $scope.user = {};

    $scope.goToMenu = function() {
        $state.go('menu')
    };

    $scope.goToLogin = function() {
        $state.go('login')
    };

    $scope.showLog = function(name, address) {
        $ionicPopup.alert({
            title: 'Map',
            template: 'Your location has been saved!!' + name + address
        });
    };

    ionicMaterialInk.displayEffect();
});

app.directive('map', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var initialLocation;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    secondaryLocation = new google.maps.LatLng(position.coords - 1, position.coords.longitude + 1);
                    map.setCenter(initialLocation);
                    var marker = new google.maps.Marker({
                        position: initialLocation,
                        map: map
                    });
                    var service = new google.maps.places.PlacesService(map);
                    service.nearbySearch({
                        location: initialLocation,
                        radius: 1000,
                        types: ['restaurant']
                    }, processResults);

                    function processResults(results, status, pagination) {
                        if (status !== google.maps.places.PlacesServiceStatus.OK) {
                            return;
                        } else {
                            createMarkers(results);

                            if (pagination.hasNextPage) {
                                var moreButton = document.getElementById('more');
                                if (moreButton) {
                                    moreButton.disabled = false;

                                    moreButton.addEventListener('click', function() {
                                        moreButton.disabled = true;
                                        pagination.nextPage();
                                    });
                                }
                            }
                        }
                    }




                    var infowindow = new google.maps.InfoWindow();


                    function createMarkers(places) {
                        var bounds = new google.maps.LatLngBounds();
                        var placesList = document.getElementById('places');
                        for (var i = 0, place; place = places[i]; i++) {
                            (function() {
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
                                    position: place.geometry.location,
                                    address: place.vicinity,
                                    id: place.id
                                });

                                marker.setPlace({
                                    placeId: place.id,
                                    location: place.geometry.location
                                });

                                marker.addListener('click', function() {
                                    infowindow.setContent('<div><strong>' + marker.title + '</strong><br>' + marker.address + '<br>' + '<a href =\"/#/menu/' + marker.title + '\"> View Menu </a></span></div>');
                                    infowindow.open(map, marker);

                                    /* 	document.getElementsByClassName("js-menu")[0].addEventListener('click', function(){
                                    	alert(marker.title +"  "+marker.address+"  " + marker.position);
                                    	openMap(marker.title,marker.address);
                                    	});*/
                                });




                                if (placesList) {
                                    placesList.innerHTML += '<center>' + '<a href = "/#/menu/' + place.name + '"><button class="button button-custom button-card button-light js-placeTab">' + place.name + '<br>' + place.vicinity + '</button> </a><br> </center>';
                                }

                                bounds.extend(place.geometry.location);
                            }())

                        }
                        map.fitBounds(bounds);

                    }
                }, function() {
                    handleNoGeolocation(true);
                });
            } else {
                handleNoGeolocation(false);
            }
            var myLatlng = initialLocation,
                mapOptions = {
                    zoom: 15,
                    center: myLatlng,
                    disableDefaultUI: true,
                    mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId.ROADMAP],
                    }
                },
                map = new google.maps.Map(element[0], mapOptions);
        }
    };
});


function ContentController($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
}
