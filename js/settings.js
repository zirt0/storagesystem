app.controller('settingsCtrl', function($scope, $rootScope, $http) {
	   
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
	   		//console.log($scope.tags);
	   	});

	   /////terms and conditions

	    $http.post("server/read.php",{
	        'subject': 'options', 'option_name': 'terms'
	      })
	      .success(function (response){
	        var option = response.records;
			console.debug(response);		
			for(key in option) {
			    if(option.hasOwnProperty(key)) {
			        var value = option[key];
			        var option_name =  value['option_value'];
			        //option_name = "" + option_name  + "";

			        $scope.terms = option_name;
			    }
			}
	    });

	    $scope.$watch('terms', function (val){
		       
			$scope.terms =  val;
		});

	    $scope.saveTerms = function(){

	    	$http.post("server/update.php",{
	        'subject': 'options', 'option_name': 'terms', 'option_value': $scope.terms
	      })
	      .success(function (response){
	      	$scope.termsSaved =	true;
				console.log("Succesfully Added");

			window.setTimeout(function(){

				$scope.$apply(function() {
					$scope.termsSaved =	false;

	        	 });

			}, 3000);	

	  	  });

	    }

	/////terms and conditions


	///tireindicator

	$scope.$watch('redTireIndicator', function (val){
		       
		$scope.redTireIndicator =  val;
	});
	
	$scope.$watch('orangeTireIndicator', function (val){
		       
		$scope.orangeTireIndicator =  val;
	});
	
	$scope.$watch('greenTireIndicator', function (val){
		       
		$scope.greenTireIndicator =  val;
	});

	
	$http.post("server/read.php",{
        'subject': 'options', 'option_name': 'redTire'
      })
      .success(function (response){
        var option = response;
       
        	$scope.redTireIndicator = option.option_value;
        	console.log($scope.redTireIndicator);
        	//$scope.$digest();
    });

    $http.post("server/read.php",{
        'subject': 'options'
      })
      .success(function (response){
        	var option = response.records;
       
        	$scope.optionsSet = option;
        	console.log($scope.optionsSet);
        	
        	for(var x in option){
        		console.log(option[x].option_name)
        		if(option[x].option_name == 'redTire'){
        			$scope.redTireIndicator = option[x].option_value;
        		}

        		if(option[x].option_name == 'orangeTire'){
        			$scope.orangeTireIndicator = option[x].option_value;
        		}

        		if(option[x].option_name == 'terms'){
        			$scope.terms = option[x].option_value;
        		}
        	}
        	//$scope.$digest();
    });

     $scope.saveTireSize = function(){

     	$http.post("server/update.php",{
	        'subject': 'saveTires', 'redTire': $scope.redTireIndicator, 'orangeTire': $scope.orangeTireIndicator 
	      })
	      .success(function (response){
	      	$scope.tireSaved =	true;
				console.log("Succesfully Added");
				console.debug(response);

			window.setTimeout(function(){

				$scope.$apply(function() {
					$scope.tireSaved =	false;

	        	 });

			}, 3000);	

	  	  });


     }


	});