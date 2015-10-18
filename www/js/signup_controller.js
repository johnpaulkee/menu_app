app.controller('SignUpController', function($scope, $firebase, $ionicPopup, $state, $location, ionicMaterialInk) {
	$scope.data = {};

	$scope.goToMenu = function() {
		$state.go('menu')
	};

	$scope.goToMap = function() {
		$state.go('map')
	};

	$scope.signupEmail = function(){

		var ref = new Firebase("https://fmenu.firebaseio.com");
		var user_email = $scope.data.email
		var user_password = $scope.data.password
		var user_rep_password = $scope.data.rep_password

		if (user_password === user_rep_password) {
			ref.createUser({
				email    : $scope.data.email,
				password : $scope.data.password
			}, function(error, userData) {
				if (error) {
					console.log("Error creating user:", error);
				} else {
					console.log("Successfully created user account with uid:", userData.uid);
					$ionicPopup.alert({
						title: 'Succesful',
						template: 'Your account has been created'
					});
					$state.go('map');
				}
			});
		}
		else {
			$ionicPopup.alert({
				title: 'Failure',
				template: 'Your passwords do not match'
			});
		}
	};

	ionicMaterialInk.displayEffect();
})
