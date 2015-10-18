function sortObject(menuItems) {
	var sortedMenu = [];
	for (var item in menuItems) {
		sortedMenu.push([menuItems[item].itemName, menuItems[item].uids,
						 menuItems[item].itemDescription, menuItems[item].itemPrice]);
	}
	console.log(sortedMenu.length);
	sortedMenu.sort(function(a, b) {return b[1].length - a[1].length});
	var sortedMenuItems = {};
	for (var i = 0; i < sortedMenu.length; i++) {
		sortedMenuItems[sortedMenu[i][0]] = {
			itemName: sortedMenu[i][0],
			uids: sortedMenu[i][1],
			itemDescription: sortedMenu[i][2],
			itemPrice: sortedMenu[i][3]
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
