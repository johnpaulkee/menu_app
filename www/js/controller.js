function sortObject(menuItems) {
	var sortedMenu = [];
	for (var item in menuItems) {
		sortedMenu.push([menuItems[item].itemName, menuItems[item].itemScore]);
	}
	console.log(sortedMenu.length);
	sortedMenu.sort(function(a, b) {return b[1] - a[1]});
	var sortedMenuItems = {};
	for (var i = 0; i < sortedMenu.length; i++) {
		sortedMenuItems[sortedMenu[i][0]] = {
			itemName: sortedMenu[i][0],
			itemScore: sortedMenu[i][1]
		}
	}
	return sortedMenuItems;
}

$scope.goBack = function() {
  $ionicHistory.goBack();
}

function MyCtrl($scope, $ionicHistory) {
  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
}
