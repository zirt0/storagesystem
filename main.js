	var app = angular.module('APP',['ngRoute']);
	
	app.config(function($routeProvider){

		$routeProvider
			.when('/',{
				templateUrl:'partials/index.html',
				//controller:'customers'
			})
			.when('/dashboard',{
				templateUrl:'partials/dashboard.html',
				//controller:'customers'

			})
			.when('/customers',{
				templateUrl:'partials/customers.html',
				controller:'checkCustomer'

			})
			.when('/customers/:id',{
				templateUrl:'partials/customer.html',
				controller:'customerInfo'

			})
			.when('/new-product',{
				templateUrl:'partials/new-product.html',
				controller:'newProduct'

			})
			.when('/storage',{
				templateUrl:'partials/storage.html',
				controller:'containerCtrl'

			})
			.when('/contracts',{
				templateUrl:'partials/contracts.html',
				controller:'contractsCtrl'

			})
			.when('/contracts/:id',{
				templateUrl:'partials/contract_details.html',
				controller:'contractsDetailsCtrl'

			})
			.when('/users',{
				templateUrl:'partials/users.html',
				controller:'usersCtrl'

			})
			.when('/storage-management',{
				templateUrl:'partials/storage-management.html',
				controller:'testdb'

			})
			.otherwise({
				redirectTo:'/'
			});
	});

	

	app.controller('overall', function($scope){
		//console.log("hoerraa!");
	});

	 app.run(function($rootScope) {
        $rootScope.doTheBack = function() {
        	window.history.back();
            console.log("I'm global foo!");
        };
    	
    	$rootScope.dateDiff = function(date) {
    		var t = "2010-06-09 13:12:01".split(/[- :]/);

			// Apply each element to the Date function
			var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);

			console.log(d);

    		//today = today.toString();
    		///return today;
    	}
    	$rootScope.mySplit = function(string, nb) {
		    $scope.array = string.split(',');
		    return $scope.result = $scope.array[nb];
		}

		$rootScope.sezon = function(sezon){
			if(sezon == "zomer"){
				return "<img src='/lib/img/snowflake'>";
			}else{
				return "Yeaah it is Winter, WinterPicture";
			}

		}

    });

	app.controller('customerInfo', ['$scope', '$http' , '$routeParams', function ($scope, $http,  $routeParams) {

		$scope.idCustomers = $routeParams.id;

		$http.post("server/read.php",{'subject': "customerInfo", 'customerId': $scope.idCustomers})
		
	   		.success(function (response) {

	   			$scope.customerInfo = response;
	   			console.log($scope.customerInfo);
	   			$scope.company = $scope.customerInfo['company']

	   	});
	}]);

	app.controller('checkCustomer', ['$scope', '$http', '$routeParams', function ($scope, $http ) {
		
		//$http.get("server/read.php")
		$http.post("server/read.php",{'subject': "customers"})	
			
	   		.success(function (response) {
	   			//console.debug(response);

	   			$scope.customers = response.records;

	   	});
	}]);

	app.controller('AboutController', function($scope, $http){
		
		console.debug("Helloooo");
		$http.post("server/insert.php",{'fstname': "Mihrali", 'password': "fatma1234", 'status': '1'})
        	.success(function(data, status, headers, config){
           		 console.log("inserted Successfully");
        });
	});

	app.controller('testdb', function($scope, $http) {
	   
	   $scope.adem = "ademmm";
	   //$http.get("http://storagesystem.nl:8888/test.php")
	   $http.post("server/insert.php",{'subject': "customers"})
	   .success(function (response) {
	   		console.debug(response);

	   		$scope.adem = response;
	   	
	   	});
	});

	app.controller('containerCtrl', function($scope, $http) {
	   
	   $scope.adem = "ademmm";
	   //$http.get("http://storagesystem.nl:8888/test.php")
	   $http.post("server/read.php",{'subject': "container"})
	   .success(function (response) {
	   		console.debug(response);

	   		$scope.container = response.records;
	   	
	   	});
	});
	
	app.controller('contractsCtrl', function($scope, $http) {
	   
	   $scope.today = new Date();
	   //$http.get("http://storagesystem.nl:8888/test.php")
	   $http.post("server/read.php",{'subject': "contracts"})
	   .success(function (response) {
	   		console.debug(response);

	   		$scope.container = response.records;
	   	
	   	});
	});


	app.controller('contractsDetailsCtrl', ['$scope', '$http' , '$routeParams', function ($scope, $http,  $routeParams) {

		
		$scope.idContract = "" + $routeParams.id + "";
		console.log($scope.idContract);
		$tire_profile = "asdasd";

		$http.post("server/read.php",{'subject': "contractdetail", 'contractId': $scope.idContract})
	   .success(function (response) {
	   		console.debug(response);

	   		$scope.contractDetail = response.records;

	   		for (var key in $scope.contractDetail) {
			   if ($scope.contractDetail.hasOwnProperty(key)) {
			       var obj = $scope.contractDetail[key];
			        for (var prop in obj) {
			          // important check that this is objects own property 
			          // not from prototype prop inherited
			          if(obj.hasOwnProperty(prop)){
			            console.debug(prop + " = " + obj[prop]);
			            if(prop == "tire_profile"){


			            	$tire_profile = obj[prop];
			            	//$scope.$apply();
			            	//console.log($tire_profile);
			            }


			          }
			       }
			    }
			}

		// $scope.$apply(function() {
   		//	$tire_profile = $tire_profile;
		//    });
			//$tire_profile = $tire_profile;
			console.log($tire_profile);
	   		//$scope.tires = $scope.container['tire_profile'];
	   		//console.debug($scope.tires);
	   	
	   	});
	   $adem = "sdfsd";

	}]);

	app.controller('usersCtrl', function($scope, $http) {
	   
	   //$scope.adem = "ademmm";
	   //$http.get("http://storagesystem.nl:8888/test.php")

	   //$scope.copies = ContentPage.copies();
	   $http.post("server/read.php",{'subject': "users"})
	   .success(function (response) {

	   		$scope.adem;
	   		$scope.gebruikers = response.records;
	   		console.log($scope.gebruikers);
	   	
	   	});
	
	});

