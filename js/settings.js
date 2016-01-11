app.controller('settingsCtrl', function($scope, $http) {
	   
		  $scope.log = [];
		   
		  $scope.loadSuperheroes = function(query) {
		    // An arrays of strings here will also be converted into an
		    // array of objects
		    return $http.get('superheroes.json');
		  };
		  
		  $scope.tagAdded = function(tag) {
		    $scope.log.push('Added: ' + tag.text);

		    $http.post("server/insert.php",{'subject': "insert_tire", 'tirebrand': tag.text})
		   	.success(function (response) {
		   		console.log(response);
		   	
		   	});
		  };
		  
		  $scope.tagRemoved = function(tag) {
		    $scope.log.push('Removed: ' + tag.text);

		    $http.post("server/remove.php",{'subject': "remove_tire", 'tirebrand': tag.text})
		   	.success(function (response) {
		   		console.log(response);
		   	});
		  };
	   $http.post("server/read.php",{'subject': "tire_brands"})
	   .success(function (response) {
	   		$scope.log = [];

	   		$scope.tags = response.records;
	   		$scope.tags1 = [
				            { text: 'just' },
				            { text: 'some' },
				            { text: 'cool' },
				            { text: 'tags' }
				          ];
	   		console.log($scope.tags);
	   	});
	
	});