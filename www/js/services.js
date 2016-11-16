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

.factory('MyTrips', function() {
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
		}
	};
})

.factory('Geolocation', function() {
	var watchId;
	
	var onNewPosition = function(position) {
		console.log(position);
	};
	var onErrorPositioning = function(positionError) {
		console.log(positionError);
	};
	
	return {
		start: function() {
			watchId = navigator.geolocation.watchPosition(
				function(position) { onNewPosition(position); },
				function(positionError) { onErrorPositioning(positionError); },
				{ timeout: 60000, maximumAge: 300000, enableHighAccuracy: true }
			);
		},
		stop: function() {
			navigator.geolocation.clearWatch(watchId);
			watchId = undefined;
		},
		get: function() {
			navigator.geolocation.getCurrentPosition(
				function(position) { onNewPosition(position); },
				function(positionError) { onErrorPositioning(positionError); },
				{ timeout: 60000, maximumAge: 300000, enableHighAccuracy: true }
			);
		}
	};
})
;
