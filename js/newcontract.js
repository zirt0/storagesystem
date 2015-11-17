	app.controller('newProductCtrl', function($scope, $http, $rootScope){
		
		$scope.bandprofiel = true;
		$scope.bandmaat = true;
		$scope.bandmerk = true;
		$scope.bandtype = true;
		$scope.velg = true;
		$scope.viermerk = true;
		$scope.vierprofiel = true;
		//$scope.flatrun = false;
		//$scope.contract(6);

		var today = $rootScope.dateformat();
	    var sezoen = parseInt($scope.sezoen, 0);

		$scope.startdate = Date.today();
	
		$scope.contract = function(v){
			
			if(v == "12"){
				console.log("this is the value " + v);
				$scope.enddate = Date.today().add(12).months();	
			}else if(v == "6"){
				$scope.enddate = Date.today().add(6).months();	
			}
		}

		$scope.contract(6);

		$scope.changeCheckbox = function(){
			console.log("checkbox check " + $scope.viermerk);
		}

		$scope.contractChange = function(){
			
			console.log($scope.contract + "contract date is changed");

			if($scope.contract == "12"){

				$scope.enddate = Date.today().add(12).months();
				console.log($scope.contract + " contract date is changed " + $scope.enddate);
			}

		}

		$scope.$watch('bandprofiel1', function(v){

			if ($scope.bandprofiel){
				//console.debug("waarde band1 " + v);
				$scope.bandprofiel2 = v;
				$scope.bandprofiel3 = v;
				$scope.bandprofiel4 = v;
			}
		});

		$scope.$watch('bandenmaat1', function(v){

			if ($scope.bandenmaat){
				//console.debug("waarde band1 " + v);
				$scope.bandenmaat2 = v;
				$scope.bandenmaat3 = v;
				$scope.bandenmaat4 = v;
			}
		});
		
		$scope.$watch('bandenmerk1', function(v){

			if ($scope.bandmerk){
				//console.debug("waarde band1 " + v);
				$scope.bandenmerk2 = v;
				$scope.bandenmerk3 = v;
				$scope.bandenmerk4 = v;
			}
		});

		$scope.$watch('bandtype1', function(v){

			if ($scope.bandtype){
				//console.debug("waarde band1 " + v);
				$scope.bandtype2 = v;
				$scope.bandtype3 = v;
				$scope.bandtype4 = v;
			}
		});

		$scope.buttonClicked = function() {
		      $scope.myVar = 2; // This will trigger $watch expression to kick in
		      $scope.enddate = Date.today().add(12).months();
		   };
		

		
		
		console.log($scope.stardate);

		$scope.bandenmaat = "";

		$http.post("server/insertcontract.php",{
			'subject': "insert_contract",
			'company_id': '' + $scope.company_id + '' ,
			'sezoen': '' + $scope.sezoen + '' ,
			'velg': '' + $scope.velg + '' ,
			'flatrun': '' + $scope.flatrun + '' ,
			'profile': '' + $scope.velg + '' ,
			'bandenmaat': '' + $scope.velg + '' ,
			'merk': '' + $scope.velg + '' ,
			'bandtype': '' + $scope.band + '',
			'startdate': '' + $scope.startdate + '',
			'enddate': '' + $scope.enddate + '',
			'duration': '' + $scope.duration + '',
			'image': '' + $scope.duration + '',
			'comment': '' + $scope.comment + ''

		})
        	.success(function (response){
        		$scope.a = response;
           		 console.log("contract inserted " + $scope.a);
        });

		$http.post("server/read.php",{'subject': "customers"})
        	.success(function (response){
        		$scope.customers = response.records;
           		 console.log($scope.customers);
        });

       	$http.post("server/read.php",{'subject': "onlycustomers"})
        	.success(function (response){
        		$scope.onlycustomers = response.records;
           		 console.log($scope.onlycustomers);
        });

		$http.post("server/read.php",{'subject': "tire_brands"})
        	.success(function (response){
        		$scope.allbrands = response.records;
           		 console.log(" Successfully" + $scope.allbrands);
        });

  

		var availableTags = $scope.onlycustomers;
	    $( "#tags" ).autocomplete({
	      source: availableTags
	    });
	});