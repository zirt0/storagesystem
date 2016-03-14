app.controller('exportDataCtrl', ['$scope', '$rootScope', '$http' , '$routeParams', function ($scope, $rootScope, $http, $routeParams) {


	$scope.$on('$viewContentLoaded', function(){
    	$http.post("server/read.php",{'subject': "contractdetail"})
		.success(function (response) {
			console.debug(response);
			$scope.container = response.records;
		});
  	});

	


}]);