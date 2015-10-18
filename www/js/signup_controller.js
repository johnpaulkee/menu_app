app.controller('SignUpController', function($scope, $firebase, $ionicPopup, $state, $location, ionicMaterialInk) {
	$scope.data = {};

	$scope.goToMenu = function() {
		$state.go('menu')
	};

	$scope.goToMap = function() {
		$state.go('map')
	};

	$scope.signupEmail = function(){

		var ref = new Firebase("https://shining-fire-3905.firebaseio.com");
		var user_email = $scope.data.email
		var user_password = $scope.data.password
		var user_rep_password = $scope.data.rep_password

		if (((user_email == null) || (user_password == null)) || (user_rep_password == null)) {
			$ionicPopup.alert({
				title: 'Login Failed',
				template: 'You are missing something. Please try again.'
			});
		}

		if (user_password === user_rep_password) {
			ref.createUser({
				email    : $scope.data.email,
				password : $scope.data.password
			}, function(error, userData) {
				if (error) {
					console.log("Error creating user:", error);
					if (user_email == null) {
						$ionicPopup.alert({
							title: 'Login Failed',
							template: 'Please provide a valid email'
						});
					}
					else {
						$ionicPopup.alert({
							title: 'Login Failed',
							template: 'You already have an account with this email'
						});
					}
				} else {
					console.log("Successfully created user account with uid:", userData.uid);
					$ionicPopup.alert({
						title: 'Successful',
						template: 'Your account has been created. Please sign in with your account.'
					});
					$state.go('login');
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
