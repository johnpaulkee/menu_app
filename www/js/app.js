// Ionic menu-app App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'menu-app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
app = angular.module('menu-app', ['ionic', 'firebase', 'ionic-material'])

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/map');    
    $stateProvider
        .state('map', {
            url: '/map',
            templateUrl: 'templates/map.html',
            controller: 'MapController'
        })
        .state('menu', {
            url: '/menu',
            templateUrl: 'templates/menu.html',
            controller: 'MenuController'
        })
})

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});