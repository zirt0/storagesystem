app.controller('usersCtrl', function($rootScope, $scope, $http, $location) {
	

	$rootScope.getUser();

	$scope.removeUser = function (userid){

		var r = confirm("Weet u zeker dat u wilt verwijderen?");
		    if (r == true) {
		    	$http.post("server/remove.php",{'subject': "removeUser", 'data': userid })
		   		.success(function (response) {
		   			console.log(response);
		   			$rootScope.getUser();
				});
		    }
	}
   
});