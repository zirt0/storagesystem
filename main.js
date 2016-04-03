	var app = angular.module('APP',['ngRoute', 'ngSanitize','angular-loading-bar' , 'ngCookies', 'ngTagsInput', 'uiSwitch', 'ngFabForm','ngMessages', 'ngAnimate', 'angular.filter', 'angularModalService', 'ngFileUpload', 'ngCsv']);
	
	app.filter("sanitize", ['$sce', function($sce) {
		return function(htmlCode){
			return $sce.trustAsHtml(htmlCode);
		}
	}]);

	app.config(function($routeProvider){

		$routeProvider
		// .when('/',{
		// 	templateUrl:'partials/index.html',
		// 		//controller:'customers'
		// 	})
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
			templateUrl:'partials/addnewcustomer.html',
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

		.when('/export',{
			templateUrl:'partials/export.html',
			controller:'exportDataCtrl'
		})

		.otherwise({
			redirectTo:'/dashboard'
		});
	});

	app.controller('overall', function($scope){
		//console.log("hoerraa!");
	});

	app.run(function($rootScope, $location, $cookies, $http) {

		$rootScope.$on('$routeChangeSuccess', function (event, next, current) {
	        console.log("finished loading");
	    });

		$rootScope.userRole = $cookies.get("userRole");

		$http.post("server/read.php",{'subject': "options"})
			.success(function (response) {
				console.debug(response);
				console.debug("test");

				$rootScope.options = response.records;
		});
		
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

	  $http.post("server/read.php",{
		        'subject': 'options'
		      })
		      .success(function (response){
		        	var option = response.records;
		        	
		        	for(var x in option){
		        		console.log(option[x].option_name)
		        		if(option[x].option_name == 'redTire'){
		        			$rootScope.redTireIndicator = option[x].option_value;
		        		}

		        		if(option[x].option_name == 'orangeTire'){
		        			$rootScope.orangeTireIndicator = option[x].option_value;
		        		}
		        	}

		        	console.log("Test from Run");
		        	//$scope.$digest();
		    });

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
			//console.log(profile);


			if(profile <= $rootScope.redTireIndicator){

					return "tireBad";

				}else if(profile <= $rootScope.orangeTireIndicator){

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

		$rootScope.loadContainers = function() {

		    $http.post("server/read.php",{
		        'subject': 'containers'
		      })
		      .success(function (response){
		        $rootScope.containers = response.records;
		           console.log($rootScope.containers);
		           console.log("load storage");
		    });
		  }

		$rootScope.contractAddedSuccesfully = false;


		$rootScope.downloadCSV = function(){
			console.log("download CSV test");
		}

		$rootScope.getOptions = function(option_name) {

		    $http.post("server/read.php",{
		        'subject': 'options','option_name': option_name
		      })
		      .success(function (response){
		      	console.log("get response" + response);
		        
		       $rootScope.redProfile =  response.option_value;
		    })
		     .error(function (status){
		      	console.log("get error" + status);
		        
		       return response.option_value;
		    });
		 }


	});

	app.controller('addCustomer',function($rootScope, $scope, $http){

		//see file js/addnewcustomer.js
		addnewcustomerFnc($scope, $http); 


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
			
			$scope.customeId = $scope.customerInfo['id']
			$scope.company = $scope.customerInfo['company'];
			$scope.fname = $scope.customerInfo['fname'];
			$scope.lname = $scope.customerInfo['lname'];
			$scope.merk = $scope.customerInfo['merk'];
			$scope.tel = $scope.customerInfo['tel'];
			$scope.email = $scope.customerInfo['email'];


		});

		$http.post("server/read.php",{'subject': "contracts", "customerId": $scope.idCustomers})
		.success(function (response) {
			console.debug("contracts of this customer");
			console.debug(response);

			$scope.contracts = response.records;

			
		});
		$("td > input, button.saveCustomer, button.cancelCustomer").hide();

		$scope.editCustomer = function(){

			$("td > input, button.saveCustomer, button.cancelCustomer").show();
			$("td > span, button.editCustomer").hide();

			console.log("Edit Customer" + $scope.editComapny);
		}

		$scope.cancelCustomeredit = function(){

			console.log("customer edit");

			$("td > input, button.saveCustomer, button.cancelCustomer").hide();
			$("td > span, button.editCustomer").show();

			//console.log("Edit Customer" + $scope.editComapny);
		}

		$scope.removeCustomer = function(id){

			console.log(id);

			var r = confirm("Weet u zeker dat u deze klant wilt verwijderen?");
			if (r == true) {
				$http.post("server/remove.php",{'subject': "remove_customer", 'id': id})
			   	.success(function (response) {
			   		console.log(response);
			   	});
			   	$location.path( "/customers" );
			} else {
				
			}	

			//remove customer

			//console.log("Edit Customer" + $scope.editComapny);
		}

		$scope.saveCustomeredit = function(){

			$http.post("server/update.php",{'subject': "updateCustomer", 'id': $scope.customeId , 'company': $scope.company , 'fname': $scope.fname , 'lname': $scope.lname, 'merk': $scope.merk, 'tel': $scope.tel, 'email': $scope.email, 'id': $scope.customeId})
			
			.success(function (response) {

				console.log(response);
				$scope.customerEditedSuccesfully = true;
				$("td > input, button.saveCustomer, button.cancelCustomer").hide();
				$("td > span, button.editCustomer").show();
				window.setTimeout(function(){

					$scope.$apply(function() {
						$scope.customerEditedSuccesfully = false;

		        	 });

				}, 3000);				
				//location.reload();

			});
		}

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

		function exportTableToCSV(table, filename) {
			console.log(table)

	        var $rows = table.find('tr:has(td)'),

	            // Temporary delimiter characters unlikely to be typed by keyboard
	            // This is to avoid accidentally splitting the actual contents
	            tmpColDelim = String.fromCharCode(11), // vertical tab character
	            tmpRowDelim = String.fromCharCode(0), // null character

	            // actual delimiter characters for CSV format
	            colDelim = '","',
	            rowDelim = '"\r\n"',

	            // Grab text from table into CSV formatted string
	            csv = '"' + $rows.map(function (i, row) {
	                var $row = $(row),
	                    $cols = $row.find('td');

	                return $cols.map(function (j, col) {
	                    var $col = $(col),
	                        text = $col.text();

	                    return text.replace(/"/g, '""'); // escape double quotes

	                }).get().join(tmpColDelim);

	            }).get().join(tmpRowDelim)
	                .split(tmpRowDelim).join(rowDelim)
	                .split(tmpColDelim).join(colDelim) + '"',

	            // Data URI
	            csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

	        $(this)
	            .attr({
	            'download': filename,
	                'href': csvData,
	                'target': '_blank'
	        });
	    }

	    // This must be a hyperlink
	   $scope.makeCSV = function() {
	        // CSV
	        console.log("makeCSV")
	        var table = $('#contracttable>table');
	        exportTableToCSV(table, 'export.csv');
	        
	        // IF CSV, don't do event.preventDefault() or return false
	        // We actually need this to be a typical hyperlink
	    };

	    $scope.exportCSVcontract =  function(){
	    	return jQuery("#contracttable>table");
	    }
	});	

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

