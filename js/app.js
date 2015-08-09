var app = angular.module('chatApp', ['ngRoute']);

var ath;

app.controller('ChatCtrl', ['$scope', '$http', '$timeout', '$location', function($scope, $http, $timeout, $location){
	if(!ath){
		$location.path('/');
	}
	$scope.chatItems = [];

	$scope.send = function(){
		var msg = $scope.message;
		if(msg){
			var d = new Date();
			$scope.chatItems.push({author: ath.getName(), text: msg, date: d.getTime()});
			$scope.message = '';
		}

	};

	$scope.enter = function($event){
		$event.keyCode === 13 ? $scope.send() : 0;
	};
}]);

app.controller('WelcomeCtrl', ['$scope', '$location', function($scope, $location){
	$scope.go = function(path) {
		if($scope.username){
			ath = (function() {
				var name = $scope.username;
				return {
					getName : function(){
						return name;
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
				console.log('scrolling down...');
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




