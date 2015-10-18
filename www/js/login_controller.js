app.controller('LoginController', function($scope, $firebase, $ionicPopup, $state, $location, ionicMaterialInk) {

  $scope.goToMenu = function() {
    $state.go('menu')
  };

  $scope.goToMap = function() {
    $state.go('map')
  };

  var ref = new Firebase("https://fmenu.firebaseio.com");
  ref.createUser({
    email    : "example@firebase.com",
    password : "password"
  }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
    }
  });

  ionicMaterialInk.displayEffect();
})
