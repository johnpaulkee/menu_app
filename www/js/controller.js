function sortObject(menuItems) {
	var sortedMenu = [];
	for (var item in menuItems) {
		sortedMenu.push([menuItems[item].itemName, menuItems[item].uids,
						 menuItems[item].itemDescription, menuItems[item].itemPrice]);
	}
	console.log(sortedMenu.length);
	sortedMenu.sort(function(a, b) {
		a = getUidArray(a[1]);
		b = getUidArray(b[1]);
		return b.length - a.length});
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

function MyCtrl($scope, $ionicHistory) {
  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
}

function getUidArray(uidObj) {
	var uids = [];
	for (uid in uidObj) {
		uids.push(uidObj[uid]);
	}
	return uids;
}

function decodeHTMLStrings(menuItems) {
	for (var item in menuItems) {
		var txt = document.createElement("textarea");
	    txt.innerHTML = item;
	    item = txt.value;
	}
}
