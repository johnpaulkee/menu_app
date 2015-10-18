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

		if (user_password === user_rep_password) {
			ref.createUser({
				email    : $scope.data.email,
				password : $scope.data.password
			}, function(error, userData) {
				if (error) {
					console.log("Error creating user:", error);
					$ionicPopup.alert({
						title: 'Failure',
						template: 'You already have an account with this email'
					});
				} else {
					console.log("Successfully created user account with uid:", userData.uid);
					$ionicPopup.alert({
						title: 'Successful',
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

function userExistsCallback(userId, exists) {
  if (exists) {
    alert('user ' + userId + ' exists!');
  } else {
    alert('user ' + userId + ' does not exist!');
  }
}

// Tests to see if /users/<email> has any data.
function checkIfUserEmailExists(email) {
  var usersRef = new Firebase(USERS_LOCATION);
  usersRef.child(email).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    userExistsCallback(email, exists);
  });
}
