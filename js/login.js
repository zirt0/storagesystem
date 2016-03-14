    app.controller('loginCtrl', function($scope, $http, $rootScope, $location, $cookies){
		
		$scope.loggedIn = $rootScope.loggedIn
		console.log("dit is login");
		
		console.log($cookies.get('loggedIn'));
		

		$scope.submitLogin = function(){
			$rootScope.loggedIn = true;
		console.log("submit knop is ingedruk");
		$http.post("server/read.php",{'subject': "login", 'username': $scope.username , 'password': $scope.password })
        	.success(function (response) {

	   			//$scope.customer = response.records;
	   			console.log(response);
	   			if(response == ""){
	   				$rootScope.loggedIn = false;
	   				console.log($rootScope.loggedIn);
	   			}else{
	   				$rootScope.loggedIn = true;
	   				$location.path( "/dashboard" );
	   				$cookies.put('loggedIn', 'true');
	   				$cookies.put('userRole', response["role"]);
	   				$cookies.put('userName', response["name"]);
	   				$cookies.put('userId', response["id"]);

	   				//console.log("login" + response["role"]);
	   				console.log($rootScope.loggedIn);
	   			}

	   	});
		}


	});