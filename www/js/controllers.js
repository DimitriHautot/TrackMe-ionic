angular.module('starter.controllers', [])
/*
.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		key: process.env.GOOGLE_MAPS_API_KEY,
		libraries: 'geometry,visualization' //Librairies supplémentaires
	});
}])
*/
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

.controller('MyTripsCtrl', function($scope, $rootScope, MyTrips, Geolocation) {
	$scope.geolocating = false;
	$scope.myTrips = MyTrips.all();
	$scope.currentTrip = null;
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
	$rootScope.$on('newPositionEvent', function(event, newPosition) {
		console.info(newPosition); // TODO Triggered twice
	});
	$rootScope.$on('positionErrorEvent', function(event, positionError) {
		console.warn(positionError);
	});
	$rootScope.$on('tripCreatedEvent', function(event, trip) {
		console.info(trip);
		$scope.currentTrip = trip;
	});
	$rootScope.$on('tripUpdatedEvent', function(event, trip) {
		console.info(trip);
		$scope.currentTrip = trip;
	});

	$scope.createTrip = function() {
    MyTrips.create();
  };
	$scope.startTrip = function() {
	  $scope.currentTrip.status = "IN_PROGRESS";
    MyTrips.update($scope.currentTrip);
  };
	$scope.pauseTrip = function() {
    $scope.currentTrip.status = "PAUSED";
    MyTrips.update($scope.currentTrip);
  };
	$scope.finishTrip = function() {
    $scope.currentTrip.status = "FINISHED";
    MyTrips.update($scope.currentTrip);
  };
})

.controller('MyFriendsTripsCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

	//Wait until the map is loaded
	google.maps.event.addListenerOnce($scope.map, 'idle', function(){

	  var marker = new google.maps.Marker({
	      map: $scope.map,
	      animation: google.maps.Animation.DROP,
	      position: latLng
	  });
	  var infoWindow = new google.maps.InfoWindow({
	      content: "Here I am!"
	  });

	  google.maps.event.addListener(marker, 'click', function () {
	      infoWindow.open($scope.map, marker);
	  });
	});
  }, function(error) {
    console.log("Could not get location");
  });
})
/*
.controller('MyFriendsTripsCtrl', function($scope, uiGmapGoogleMapApi) {
	$scope.markers = [{
	   coord: {
	      latitude: 44.93, //Coordonnées où placer le point
	      longitude: 4.89
	   },
	   email: "netapsys@netapsys.fr", //Propriété métier, pour les afficher à l'utilisateur lorsqu'il sélectionne le point par exemple
	   icon: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png", //Icone personnalisée
	   id: 412
	},{
	   coord: {
	      latitude: 46.5132,
	      longitude: 0.1033
	   },
	   email: "netapsys@netapsys.fr",
	   icon: "//developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png", //Icone personnalisée
	   id: 413
	}];

	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

	$scope.clickMarker = function(marker) {
	   alert(marker.email); //Affichera l'email du point sur lequel on a cliqué
	};

	uiGmapGoogleMapApi.then(function(maps) {

	});
})
*/
;
