	var app = angular.module('APP',['ngRoute', 'ngSanitize', 'ngTagsInput', 'uiSwitch', 'ngFabForm','ngMessages', 'ngAnimate']);
	
	app.filter("sanitize", ['$sce', function($sce) {
	  return function(htmlCode){
	    return $sce.trustAsHtml(htmlCode);
	  }
	}]);

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
				controller:'newProductCtrl'

			})
			.when('/new-customer',{
				templateUrl:'partials/new-customer.html',
				controller:'newCustomerCtrl'

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
				controller:'storagemanagementCtrl'

			})

			.when('/settings',{
				templateUrl:'partials/settings.html',
				controller:'settingsCtrl'

			})
			// .otherwise({
			// 	//redirectTo:'/'
			// });
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

		$rootScope.sezon = function(sezon){
			if(sezon == "zomer"){
				return "<img src='/lib/img/snowflake'>";
			}else{
				return "Yeaah it is Winter, WinterPicture";
			}

		}

		$rootScope.dateformat = function(){
		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!
	    var yyyy = today.getFullYear();

	    if(dd<10){
	        dd='0'+dd
	    } 
	    if(mm<10){
	        mm='0'+mm
	    } 
	    var today = dd+'-'+mm+'-'+yyyy;

	    return today;

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
	   	$scope.adem1 = "naberrr";
	   	$scope.today = new Date();

	   	$scope.sortType     = 'klant'; // set the default sort type
		$scope.sortReverse  = true;  // set the default sort order
		$scope.searchCustomer   = '';     // set the default search/filter term
  
	   	//$http.get("http://storagesystem.nl:8888/test.php")
	   	$http.post("server/read.php",{'subject': "contracts"})
	   	.success(function (response) {
	   		console.debug(response);

	   		$scope.container = response.records;
	   	
	   	});
	});

	app.controller('contractsDetailsCtrl', ['$scope', '$http' , '$routeParams', function ($scope, $http, $routeParams) {

		$scope.idContract = "" + $routeParams.id + "";

		$http.post("server/read.php",{'subject': "contractdetail", 'contractId': $scope.idContract})
	   	.success(function (response) {

	   		$scope.contractDetail = response.records;

		   	console.log($scope.contractDetail);

		   		angular.forEach($scope.contractDetail[0], function(value, key) {
			  		console.log(key + ': ' + value);
			  		$scope.key = "value"
					  
					  if(key == "tire_profile"){
					  	$scope.tires = value.split(',');
					  }
				});
			console.log("TIRESSSSS " + $scope.tires);
		});

		$scope.bandDiepte = function(band){
			//band = band.toFixed(1);
			if(band < 1){
				perBand = "<div class='profiel red'>" + band + "</div>";
			}else if(band < 2){

				perBand = "<div class='profiel orange'>" + band + "</div>";

			}else{
				perBand = "<div class='profiel green'>" + band + "</div>";
			}

			return "<div class='bandrow'>" + perBand  + "</div>";

		};

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
	   //$scope.copies = ContentPage.copies();
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

