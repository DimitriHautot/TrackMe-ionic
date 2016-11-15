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

.controller('MyTripsCtrl', function($scope, MyTrips, $geolocation) {
	$scope.geolocating = false;
	$scope.myTrips = MyTrips.all();
	$scope.remove = function(myTrip) {
		MyTrips.remove(myTrip);
	};
	$scope.startPeriodicGeolocation = function() {
        $geolocation.watchPosition({
            timeout: 60000,
            maximumAge: 250,
            enableHighAccuracy: true
        });
		$scope.geolocating = true;
	};
	$scope.stopPeriodicGeolocation = function() {
		$geolocation.clearWatch;
		$scope.geolocating = false;
	};
	$scope.geolocateMe = function() {
		$geolocation.getCurrentPosition({
		            timeout: 60000
		         }).then(function(position) {
		            $scope.myPosition = position;
		         });
	};
})

.controller('MyFriendsTripsCtrl', function($scope) {})

;
