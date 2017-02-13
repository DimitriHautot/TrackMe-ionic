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

.factory('MyTrips', function($http, $rootScope) {
  var rootUrl = "http://localhost:8080/api";

	var api = {
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
    create: function(data) {
      $http.post(rootUrl + "/trip", {"description": data.description})
        .success(function (data, status, headers, config) {
          myTrips.push(data);
          console.log("ownershipToken: " + data.ownershipToken);
          api.storeOne(data);
          $rootScope.$emit('myTrip.created', data);
        })
        .error(function (data, status, headers, config) {
        });
    },
    update: function(trip, updateItem) {
      $http.patch(rootUrl + "/trip/" + trip._id,
        updateItem, {"headers": {"ownershipToken": trip.ownershipToken}}
        )
        .success(function (data, status, headers, config) {
          api.storeOne(data);
          $rootScope.$emit('myTrip.updated', data);
        })
        .error(function (data, status, header, config) {
        });
    },

    storeOne: function(trip) {
		  var trips = api.loadAll();
		  var create = true;
		  for (var i=0; i<trips.length; i++) {
		    if (trips[i]._id === trip._id) {
		      trips[i] = trip;
		      create = false;
		      break;
        }
      }
      if (create) {
		    trips.push(trip);
      }
      localStorage.setItem("myTrips", JSON.stringify(trips));
    },
    loadAll: function() {
      return JSON.parse(localStorage.getItem("myTrips")) || [];
    }
	};

  var myTrips = api.loadAll();

  return api;
})

.factory('MyFriendsTrips', function ($rootScope, $http) {
  var rootUrl = "http://localhost:8080/api";

  var api = {
    register: function(tripId) {
      api.storeOne(tripId);
      api.subscribe(tripId);

      $rootScope.$emit('friendsTrip.registered', tripId);
    },
    unregister: function(tripId) {
      api.removeOne(tripId);
      api.unsubscribe(tripId);

      $rootScope.emit('friendsTrip.unregistered', tripId);
    },
    loadAll: function() {
      return JSON.parse(localStorage.getItem("myFriendsTrips")) || [];
    },
    loadOne: function(tripId) {
      var trips = api.loadAll();
      for (var i=0; i<trips.length; i++) {
        if (trips[i]  === tripId) {
          return trips[i];
        }
      }
      return null;
    },
    storeOne: function(tripId) {
      var trips = api.loadAll();
      var exist = false;
      for (var i=0; i<trips.length; i++) {
        if (trips[i]  === tripId) {
          exist = true; break;
        }
      }
      if (!exist) {
        trips.push(tripId);
        localStorage.setItem("myFriendsTrips", JSON.stringify(trips));
      }
    },
    removeOne: function(tripId) {
      if (api.loadOne(tripId) != null) {
        var trips = api.loadAll();
        trips.splice(trips.indexOf(tripId));
        localStorage.setItem("myFriendsTrips", JSON.stringify(trips));
      }
    },
    loadContent: function(tripId) {
      $http.get(rootUrl + "/trip/" + tripId)
        .success(function(data, status, headers, config) {
          $rootScope.emit('friendsTrip.contentLoaded', data);
        })
        .error(function(data, status, headers, config) {});
    },
    subscribe: function(tripId) {
      // TODO Subscribe to websocket
    },
    unsubscribe: function(tripId) {
      // TODO Unsubscribe from websocket
    }
  };

  // Inspect Local storage, and register to web-sockets
  var allTrips = api.loadAll();
  for (var i=0; i < allTrips.length; i++) {
    api.subscribe(allTrips[i]);
  }

  return api;
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
