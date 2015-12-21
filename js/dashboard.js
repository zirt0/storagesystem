//dashboardCtrl
app.controller('dashboardCtrl', function($scope, $http, $rootScope){
		
	$http.post("server/read.php",{'subject': "customers", 'sort': 5 })
	.success(function (response) {
		$scope.customerSort = response.records;
	});

	$http.post("server/read.php",{'subject': "noInvoice", 'sort': 5 })
	.success(function (response) {
		$scope.invoiceSort = response.records;
		//console.log(response);
	});

	//sortLowProfile
	$http.post("server/read.php",{'subject': "sortLowProfile", 'sort': 5 })
	.success(function (response) {
		$scope.sortLowProfile = response.records;
		//console.log(response);
	});

	$http.post("server/read.php",{'subject': 'containers'})
	  	.success(function (response){
	  		$scope.containerSort = response.records;
	     	//console.log($scope.containers);
	});

});