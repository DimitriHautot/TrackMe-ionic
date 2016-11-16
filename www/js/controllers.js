angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MyTripsCtrl', function($scope, MyTrips, Geolocation) {
	$scope.geolocating = false;
	$scope.myTrips = MyTrips.all();
	$scope.remove = function(myTrip) {
		MyTrips.remove(myTrip);
	};
	$scope.startPeriodicGeolocation = function() {
        Geolocation.start();
		$scope.geolocating = true;
	};
	$scope.stopPeriodicGeolocation = function() {
		Geolocation.stop();
		$scope.geolocating = false;
	};
	$scope.geolocateMe = function() {
		Geolocation.get();
	};
})

.controller('MyFriendsTripsCtrl', function($scope) {})

;
