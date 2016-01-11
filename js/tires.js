//dashboardCtrl
app.controller('tiresCtrl', function($scope, $http, $rootScope){
		
$http.post("server/read.php",{'subject': 'contractdetail'})
	  	.success(function (response){
	  		$scope.banden = response.records;
	     	console.log($scope.banden);
	});
});

//dashboardCtrl
app.controller('tireslabelsCtrl', ['$scope', '$http' , '$routeParams', function ($scope, $http,  $routeParams){

	$scope.contractId = $routeParams.id;
	console.debug($scope.contractId + "this is your tireId");
		
	$http.post("server/read.php",{'subject': 'contractdetail', 'contractId': $scope.contractId })
	  	.success(function (response){
	  		console.log(response);
	  		$scope.banden = response.records;
	     	//console.log($scope.banden);
	});
}]);


