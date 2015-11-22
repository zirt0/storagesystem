app.controller('storagemanagementCtrl', function($scope, $http, $rootScope){

	$http.post("server/read.php",{
			'subject': 'containers'
		})
        	.success(function (response){
        		$scope.containers = response.records;
           		 console.log($scope.containers);
        });
		
});