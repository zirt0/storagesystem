//dashboardCtrl
app.controller('tiresCtrl', function($scope, $http, $rootScope){
		
$http.post("server/read.php",{'subject': 'contractdetail'})
	  	.success(function (response){
	  		$scope.banden = response.records;
	     	console.log($scope.banden);
	});
});