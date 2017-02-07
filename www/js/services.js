angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('MyTrips', function($http) {
  var rootUrl = "http://localhost:8080/api";
	var myTrips = [];

	return {
		all: function() {
			return myTrips;
		},
    remove: function(myTrip) {
      myTrips.splice(myTrips.indexOf(myTrip), 1);
    },
		get: function(myTripId) {
	        for (var i = 0; i < myTrips.length; i++) {
	          if (myTrips[i].id === parseInt(myTripId)) {
	            return myTrips[i];
	          }
	        }
	        return null;
		},
    create: function() {
      $http.post(rootUrl + "/trip",
        {"description": "trip to Les Carroz",
        "statusRemark": "En route!"}
        )
        .success(function (data, status, headers, config) {
          myTrips.push(data);
          log.console("ownershipToken: " + data.ownershipToken);
          // TODO Save to localStorage
          $rootScope.$emit('myTrip.created', data);
        })
        .error(function (data, status, headers, config) {
        });
    },
    update: function(trip, updateItem) {
      $http.patch(rootUrl + "/trip/" + trip._id,
        updateItem,
        {"headers": {"ownershipToken": trip.ownershipToken}}
        )
        .success(function (data, status, headers, config) {
          $rootScope.$emit('myTrip.updated', data);
        })
        .error(function (data, status, header, config) {
        });
    }
	};
})

.factory('MyFriendsTrips', function ($rootScope, $http) { // TODO LocalStorage?
  var rootUrl = "http://localhost:8080/api";

  return {
    register: function(tripId) {
      // TODO Look into local storage for such an id
      // TODO If exist, no-op
      // TODO Otherwise, save it to localstorage and emit event with tripId, so that it can be added in the combobox of the controller
    },
    unregister: function(tripId) {
      // TODO Look into local storage for such an id
      // TODO If doesn't exist, no-op
      // TODO Otherwise, remove it from localstorage and emit event with tripId, so that it can be removed from the combobox of the controller
    },
    loadAll: function() {
      return []; // FIXME with LocalStorage lookup result
    },
    loadContent: function(tripId) {
      $http.get(rootUrl + "/trip/" + tripId)
        .success(function(data, status, headers, config) {
          $rootScope.emit('friendsTrip.contentLoaded', data);
        })
        .error(function(data, status, headers, config) {});
    }
  };
})

.factory('Geolocation', function($rootScope) {
	var watchId;

	var onNewPosition = function(position) {
		$rootScope.$emit('geoloc.newPosition', position);
		console.log(position);
	};
	var onErrorPositioning = function(error) {
		$rootScope.$emit('geoloc.positionError', error);
		console.log(error);
	};

	return {
		start: function() {
			watchId = navigator.geolocation.watchPosition(
				function(position) { onNewPosition(position); },
				function(error) { onErrorPositioning(error); },
				{ timeout: 60000, maximumAge: 300000, enableHighAccuracy: true }
			);
		},
		stop: function() {
			navigator.geolocation.clearWatch(watchId);
			watchId = scope = undefined;
		},
		get: function() {
			navigator.geolocation.getCurrentPosition(
				function(position) { onNewPosition(position); },
				function(error) { onErrorPositioning(error); },
				{ timeout: 60000, maximumAge: 300000, enableHighAccuracy: true }
			);
		}
	};
})

.factory('Persistence', function() {
	return {};
})
;
