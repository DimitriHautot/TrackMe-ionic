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
      $http.post("http://localhost:8080/api/trip", {})
        .success(function (data, status, headers, config) {
          myTrips.push(data);
          $rootScope.$emit('tripCreatedEvent', data);
        })
        .error(function (data, status, header, config) {
        });
    },
    update: function(trip) {
      $http.post("/api/trip", trip)
        .success(function (data, status, headers, config) {
          $rootScope.$emit('tripUpdatedEvent', data);
        })
        .error(function (data, status, header, config) {
        });
    }
	};
})

.factory('Geolocation', function($rootScope) {
	var watchId;

	var onNewPosition = function(position) {
		$rootScope.$emit('newPositionEvent', position)
//		console.log(position);
	};
	var onErrorPositioning = function(error) {
		$rootScope.$emit('positionErrorEvent', error)
//		console.log(error);
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
