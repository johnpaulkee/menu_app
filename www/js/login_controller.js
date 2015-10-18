app.controller('LoginController', function($scope, $firebase, $ionicPopup, $state, $location, ionicMaterialInk) {

	$scope.goToMenu = function() {
		$state.go('menu')
	};

	$scope.goToMap = function() {
		$state.go('map')
	};

	ionicMaterialInk.displayEffect();
})
