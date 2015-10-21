	var app = angular.module('APP',['ngRoute']);
	
	app.config(function($routeProvider){

		$routeProvider
			.when('/',{
				templateUrl:'partials/index.html',
				controller:'HomeController'
			})
			.when('/dashboard',{
				templateUrl:'partials/dashboard.html',
				controller:'AboutController'

			})
			.when('/storage-management',{
				templateUrl:'partials/storage-management.html',
				//controller:'AboutController'

			})
			.when('/users',{
				templateUrl:'partials/users.html',
				//controller:'AboutController'

			})
			.otherwise({
				redirectTo:'/'
			});
	});

	app.controller('HomeController', function($scope){
		$scope.blogposts = [
			'blogpost1',
			'blogpost2',
			'blogpost3'
			];
	});

	app.controller('AboutController', function($scope){
		$scope.name = "Adem";
		$scope.bio = "He is master!";
	});