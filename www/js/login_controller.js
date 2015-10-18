app.controller('LoginController', function($scope, $firebase, $ionicPopup, $state, $location, ionicMaterialInk) {
  $scope.data = {};

  $scope.goToMenu = function() {
    $state.go('menu')
  };

  $scope.goToMap = function() {
    $state.go('map')
  };

  $scope.goToSignUp = function() {
    $state.go('signup')
  };

  $scope.loginEmail = function(){
    var ref = new Firebase("https://shining-fire-3905.firebaseio.com");
    var user_email = $scope.data.email;
    var user_password = $scope.data.email;

    ref.authWithPassword({
      email    : $scope.data.email,
      password : $scope.data.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        $ionicPopup.alert({
          title: 'Login Failed',
          template: 'Your email or password is wrong'
        });
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $state.go('map')
      }
    });

  };

  $scope.loginFacebook = function(){

    var ref = new Firebase("https://shining-fire-3905.firebaseio.com");
    if(ionic.Platform.isWebView()){

      $cordovaFacebook.login(["public_profile", "email"]).then(function(success){

        console.log(success);

        ref.authWithOAuthToken("facebook", success.authResponse.accessToken, function(error, authData) {
          if (error) {
            console.log('Firebase login failed!', error);
            $ionicPopup.alert({
              title: 'Login Failed',
              template: 'Your username or password is wrong'
            });
          } else {
            console.log('Authenticated successfully with payload:', authData);
            $state.go('map')
          }
        });

      }, function(error){
        console.log(error);
      });

    }
    else {

      ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });

    }

  };

  ionicMaterialInk.displayEffect();
})
