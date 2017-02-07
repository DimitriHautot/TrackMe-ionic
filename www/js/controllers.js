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
	$rootScope.$on('geoloc.newPosition', function(event, newPosition) {
	  $scope.currentTrip.geoLocations.push(newPosition);
	  MyTrips.update({"name": "geoLocation",
      "value": {
	      "timestamp": newPosition.timestamp,
        "latitude": newPosition.coords.latitude,
        "longitude": newPosition.coords.longitude
      }
	  });
	});
	// $rootScope.$on('positionErrorEvent', function(event, positionError) {
	// 	console.warn(positionError);
	// });
	$rootScope.$on('myTrip.created', function(event, trip) {
		console.info(trip);
		$scope.currentTrip = trip;
	});
	$rootScope.$on('myTrip.updated', function(event, trip) {
		console.info(trip);
		$scope.currentTrip = trip;
	});

	$scope.createTrip = function() {
    MyTrips.create();
  };
	$scope.startTrip = function() {
	  $scope.currentTrip.status = "IN_PROGRESS";
    MyTrips.update({"name": "status", "value": "IN_PROGRESS"});
  };
	$scope.pauseTrip = function() {
    $scope.currentTrip.status = "PAUSED";
    MyTrips.update({"name": "status", "value": "PAUSED"});
  };
	$scope.finishTrip = function() {
    $scope.currentTrip.status = "FINISHED";
    MyTrips.update({"name": "status", "value": "FINISHED"});
  };
})

.controller('MyFriendsTripsCtrl', function($rootScope, $scope, $state, $cordovaGeolocation, MyFriendsTrips) {
  $scope.data = {
    newTripId: "",
    selectedTrip: {},
    registeredTrips: []
  };

  $scope.register = function() {
    MyFriendsTrips.register($scope.data.newTripId);
  };
  $rootScope.$on('friendsTrip.registered', function (event, tripId) {
    $scope.data.newTripId = "";
    $scope.data.registeredTrips.push({id: tripId, name: tripId});
  });

  $scope.unregister = function() {
    MyFriendsTrips.unregister($scope.data.selectedTrip);
  };
  $rootScope.$on('friendsTrip.unregistered', function (event, tripId) {
    $scope.data.registeredTrips.splice($scope.data.registeredTrips.indexOf(tripId), 1);
  });

  $scope.viewSelected = function() {
    MyFriendsTrips.loadContent($scope.data.selectedTrip.id);
  };
  $rootScope.$on('friendsTrip.contentLoaded', function(event, trip) {
    // TODO Load map according to latest trip.geolocations
    // TODO Display trip.geolocations on map
  });



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

  $scope.data.registeredTrips = MyFriendsTrips.loadAll();
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
