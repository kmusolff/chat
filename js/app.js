var app = angular.module('chatApp', ['ngRoute']);

var ath;
var socket = io();

app.controller('ChatCtrl', ['$scope', '$http', '$timeout', '$location', function($scope, $http, $timeout, $location){
	if(!ath){
		$location.path('/');
	}
	$scope.chatItems = [];
	$scope.room = ath.getRoom();
	$scope.send = function(){
		var msg = $scope.message;
		if(msg){
			var d = new Date();
			///$scope.chatItems.push({author: ath.getName(), text: msg, date: d.getTime()});
			socket.emit('chat message', {author: ath.getName(), 
				text: msg, 
				date: d.getTime(), 
				room : ath.getRoom()});
			$scope.message = '';
		}

	};

	$scope.enter = function($event){
		$event.keyCode === 13 ? $scope.send() : 0;
	};

	$scope.users = 0;

	socket.emit('sign', {name : ath.getName(), room : ath.getRoom()});

	socket.on('new user', function(data){
		console.log(data);
		$scope.users = data.count;
		$scope.$apply();
	});

	socket.on('user left', function(data){
		console.log(data);
		$scope.users = data.count;
		$scope.$apply();
	});

	socket.on('chat message', function(data){
		console.log(data);
		$scope.chatItems.push(data);
		//$scope.message = '';
		$scope.$apply();
	});
}]);

app.controller('WelcomeCtrl', ['$scope', '$location', function($scope, $location){
	$scope.go = function(path) {
		if($scope.username && $scope.room){
			ath = (function() {
				var name = $scope.username;
				var room = $scope.room;
				return {
					getName : function(){
						return name;
					},
					getRoom : function() {
						return room;
					}
				};
			})();
			$location.path(path);
		}
	}

	$scope.enter = function($event){
		$event.keyCode === 13 ? $scope.go('/chat') : 0;
	};
}])


app.directive('chatItem', function(){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'temp/chatItem.html',
	};
});

app.directive('scroller', function() {
	return {
		 priority: 1,
		 restrict: 'A',
		link: function($scope, iElm, iAttrs, controller) {
			$scope.$watchCollection('chatItems', function() {
				//console.log('scrolling down...');
				iElm.scrollTop(iElm[0].scrollHeight);
			});
		}
	};
});

app.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.
			when('/',{
				templateUrl: 'temp/welcome.html',
				controller: 'WelcomeCtrl'
			}).
			when('/chat', {
				templateUrl: 'temp/chat.html',
				controller: 'ChatCtrl'
			}).
			otherwise({redirectTo: '/'});
}]);




