	var app = angular.module('APP',['ngRoute', 'ngSanitize', 'ngCookies', 'ngTagsInput', 'uiSwitch', 'ngFabForm','ngMessages', 'ngAnimate', 'angular.filter', 'angularModalService', 'ngFileUpload']);
	
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
		.when('/login',{
			templateUrl:'partials/login.html',
			controller:'loginCtrl'
		})
		.when('/dashboard',{
			templateUrl:'partials/dashboard.html',
			controller:'dashboardCtrl'

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

		.when('/new-product/addcontainer',{
			templateUrl:'partials/addcontainer.html',
			controller:'newProductCtrl'

		})

		.when('/new-product/addto',{
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

		.when('/storage-management/:id',{
			templateUrl:'partials/container_content.html',
			controller:'containerContentCtrl'

		})

		.when('/settings',{
			templateUrl:'partials/settings.html',
			controller:'settingsCtrl'

		})
		.when('/addcustomer',{
			templateUrl:'partials/addcustomer.html',
			controller:'addCustomer'

		})
		.when('/tires',{
			templateUrl:'partials/tires.html',
			controller:'tiresCtrl'

		})
		.when('/tirelabels/:id',{
			templateUrl:'partials/tirelabels.html',
			controller:'tireslabelsCtrl'

		})
		.when('/nopermission',{
			templateUrl:'partials/nopermission.html',
			controller:'tiresCtrl'

		})

		.otherwise({
			redirectTo:'/dashboard'
		});
	});

	app.controller('overall', function($scope){
		//console.log("hoerraa!");
	});

	app.run(function($rootScope, $location, $cookies, $http) {

		$rootScope.userRole = $cookies.get("userRole");
		
		$rootScope.$on( "$routeChangeStart", function(event, next, current) {

			if ( $cookies.get('loggedIn') == 'false' || $cookies.get('loggedIn') == undefined) {
				console.log("routeChanges");
				$location.path( "/login" );

			}else{
			//$location.path( "/dashboard" );
			//console.log("1Justlogged In is true " + $cookies.get("userRole"))
			$rootScope.justLogin = true;      	
		}

	      //if user is loggedin and he is not admin
	      if($rootScope.justLogin == true && $rootScope.userRole != "admin"){
	      	console.log("2Justlogged In is true ")
	      	//no logged user, we should be going to #login 
	      	if ( next.templateUrl == "partials/tires.html" || next.templateUrl == "partials/users.html" || next.templateUrl == "partials/settings.html" || next.templateUrl == "partials/storage-management.html" ) 
	      	{
	      		console.log("we are in contracts");
	      		$location.path('/nopermission'); 
	          // already going to #login, no redirect needed
	      }

	  }

	});

		$rootScope.logoff = function(){

			var r = confirm("Wilt u uitloggen?");
			if (r == true) {
				$cookies.remove('loggedIn');
				$rootScope.justLogin = false;
				$location.path( "/login" );
			} else {
				
			}	    	
		}

		$rootScope.userName = $cookies.get('userName');
		$rootScope.userId = $cookies.get('userId');

		$rootScope.chosenCustomer = "";

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
    			return "<img src='/lib/img/sunny82.png'>";
    		}else{
    			return "<img src='/lib/img/snowflake1.png'>";
    		}

    	}

    	$rootScope.YesNo = function(sezon){
    		if(sezon == 0){
    			return "No";
    		}else{
    			return "Yes";
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

		$rootScope.tireProfile = function(profile){
			
			var profile = Number(profile);
			console.log(profile);
			if(profile <= 1){

				return "tireBad";

			}else if(profile <= 2){

				return "tireNormal";

			}else{

				return "tireGood";

			}
		}

		$rootScope.differenceDate = function(val1, val2){
			//var date1 = new Date(val1);
			var date1 = new Date();
			console.log(date1);
			var date2 = new Date(val2);
			var timeDiff = Math.abs(date2.getTime() - date1.getTime());
			var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
			console.log(diffDays);

			if(isNaN(diffDays) || diffDays == "Invalid Date"){
				return "Error Date";
			}else{
				return diffDays + " Dagen";
			}
			
		}

		$rootScope.getUser = function(){
			console.log("getuser Rootscope");
			$http.post("server/read.php",{'subject': "users"})
			.success(function (response) {

				$rootScope.gebruikers = response.records;
				console.log($rootScope.gebruikers);
				
			});	
		}

	});

	app.controller('addCustomer',function($rootScope, $scope, $http){

		$scope.x = "test"
	 	$scope.sortType     = 'company', 'fname','lname','merk'; // set the default sort type
		$scope.sortReverse  = true;  // set the default sort order
		$scope.searchCustomer   = '';     // set the default search/filter term

		$http.post("server/read.php",{'subject': "customers"})
		
		.success(function (response) {

			$scope.customer = response.records;

		});

		$scope.selectCustomer = function(id, company, name ){
			$rootScope.chosenCustomer = id + "." + company + " - " + name;
			$rootScope.chosenCustomerId = id;
			$('#SelectCustomer').foundation('reveal', 'close');
		}

	})

	app.controller('customerInfo', ['$scope', '$http' , '$routeParams', function ($scope, $http,  $routeParams) {

		$scope.idCustomers = $routeParams.id;

		$http.post("server/read.php",{'subject': "customerInfo", 'customerId': $scope.idCustomers})
		
		.success(function (response) {

			$scope.customerInfo = response;
			console.log($scope.customerInfo);
			$scope.company = $scope.customerInfo['company']

		});

		$http.post("server/read.php",{'subject': "contracts", "customerId": $scope.idCustomers})
		.success(function (response) {
			console.debug("contracts of this customer");
			console.debug(response);

			$scope.contracts = response.records;

			
		});
	}]);

	app.controller('checkCustomer', ['$scope', '$http', '$routeParams', function ($scope, $http ) {
		
		//$http.get("server/read.php")
		$http.post("server/read.php",{'subject': "customers"})	
		
		.success(function (response) {
			console.debug(response);

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
		
		$scope.invoicestatus = function(status){

			if(status != ""){
				return '<div class="green-icon"><i class="fa fa-check-square"></i></div>';
			}else{
				return '<div class="red-icon"><i class="fa fa-exclamation-circle"></i></div>';
			}

		}

		$scope.today = new Date();

	   	$scope.sortType     = 'container_name', 'klant'; // set the default sort type
		$scope.sortReverse  = true;  // set the default sort order
		$scope.searchCustomer   = '';     // set the default search/filter term
		
		$http.post("server/read.php",{'subject': "contracts"})
		.success(function (response) {
			console.debug(response);

			$scope.container = response.records;
			
		});
	});

	app.controller('contractsDetailsCtrl', ['$scope', '$http' , '$routeParams', function ($scope, $http, $routeParams) {

		$scope.idContract = "" + $routeParams.id + "";
		
		$scope.invoicestatus = function(number){
			
			if(number != ""){
				return "green";
			}else{
				return "red";
			}
		};

		$scope.saveinvoiceNo = function(){
			
			var val = jQuery("input[name='invoiceNumber']").val();
			
			$http.post("server/update.php",{'subject': "update_invoiceno", 'value': val , 'id': $scope.idContract})
			
			.success(function (response) {

				$scope.contractDetail = response.records;

				//console.log($scope.contractDetail.invoiceno);

			console.log(response);
			});


		};

		$http.post("server/read.php",{'subject': "contractdetail", 'contractId': $scope.idContract})
		.success(function (response) {

			$scope.contractDetail = response.records;

			//console.log($scope.contractDetail.invoiceno);

		console.log(response);
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

	app.controller('addUserwindow', function($rootScope, $scope, $http, $location){
		
		$scope.addUser = function(){
			console.log("button is pressed");
			$http.post("server/insert.php",{'subject': "addUser", 'addUsername': $scope.addUsername , "addPassword": $scope.addPassword})
			.success(function (response) {

				console.log(response);
				$scope.addUsername = "";
				$scope.addPassword = "";
				$('#addUserModal').foundation('reveal', 'close');
				$rootScope.getUser();
			});	
		};

	});

