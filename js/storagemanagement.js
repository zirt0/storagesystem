app.controller('storagemanagementCtrl', function($scope, $http, $rootScope){

	$http.post("server/read.php",{
			'subject': 'containers'
		})
        	.success(function (response){
        		$scope.containers = response.records;
           		 console.log($scope.containers);
        });
		
});

app.controller('containerContentCtrl', ['$scope', '$http' , '$routeParams', function ($scope, $http,  $routeParams) {

	$scope.idContainer = $routeParams.id;
	console.log($scope.idContainer);
	$http.post("server/read.php",{'subject': "containerContent", 'containerId': $scope.idContainer})
	
   		.success(function (response) {

   			console.log(response);
   			$scope.places = response.records;
   			// $scope.company = $scope.customerInfo['company']

   	});

   $scope.occupy  = function(status){

   		if(status == 1){

   			return "Bezet"

   		}else{
   			return "Vrij";   		
   		}
   }
}]);