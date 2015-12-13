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
			// .otherwise({
			// 	//redirectTo:'/'
			// });
	});

	

	app.controller('overall', function($scope){
		//console.log("hoerraa!");
	});

	 app.run(function($rootScope, $location, $cookies) {

	 	console.log("cookies " + $cookies.get('loggedIn'));
	 	
	 	$rootScope.$on( "$routeChangeStart", function(event, next, current) {

	      if ( $cookies.get('loggedIn') == 'false' || $cookies.get('loggedIn') == undefined) {
	      	console.log("routeChanges");
	        $location.path( "/login" );

	        // no logged user, we should be going to #login
	        // if ( next.templateUrl == "partials/login.html" ) {
	        // 	console.log("we are in contracts");
	        // 	//$location.path('/login'); 
	        //   // already going to #login, no redirect needed
	        // } else {
	        //   // not going to #login, we should redirect now
	        //   //$location.path( "/login" );
	        // }
	      }else if($rootScope.justLogin == true){

	      }else{
			$location.path( "/dashboard" );
			$rootScope.justLogin = true;      	
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
			if(profile < 1){
				return "tireBad";
			}else if(profile < 2){
				return "tireNormal";
			}else{
				return "tireGood";
			}
		}

    });

    app.controller('loginCtrl', function($scope, $http, $rootScope, $location, $cookies){
		
		$scope.username = "adem";
		$scope.password = "password1234";
		$scope.loggedIn = $rootScope.loggedIn
		console.log("dit is login");
		
		console.log($cookies.get('loggedIn'));
		

		$scope.submitLogin = function(){
			$rootScope.loggedIn = true;
		console.log("submit knop is ingedruk");
		$http.post("server/read.php",{'subject': "login", 'username': $scope.username , 'password': $scope.password })
        	.success(function (response) {

	   			//$scope.customer = response.records;
	   			console.log(response);
	   			if(response == ""){
	   				$rootScope.loggedIn = false;
	   				console.log($rootScope.loggedIn);
	   			}else{
	   				$rootScope.loggedIn = true;
	   				$location.path( "/dashboard" );
	   				$cookies.put('loggedIn', 'true');

	   				console.log($rootScope.loggedIn);
	   			}

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
	   	$scope.adem1 = "naberrr";
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

		$http.post("server/read.php",{'subject': "contractdetail", 'contractId': $scope.idContract})
	   	.success(function (response) {

	   		$scope.contractDetail = response.records;

		  //  	console.log($scope.contractDetail);

		  //  		angular.forEach($scope.contractDetail[0], function(value, key) {
			 //  		console.log(key + ': ' + value);
			 //  		$scope.key = "value"
					  
				// 	  if(key == "tire_profile"){
				// 	  	$scope.tires = value.split(',');
				// 	  }
				// });
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

	app.controller('addContainer', function($scope, $http, $location) {
		$scope.containerName;
		$scope.containerColor;

		var plekken = 51;
		$scope.places = [];

		for (i = 1; i < plekken; i++) { 
		    $scope.places.push(i);
		}

		$scope.nextAddContainer = function(){

			console.log($scope.containerColor + " " + $scope.containerName );
			
			//check if all fields are filled
			if($scope.containerName != undefined && $scope.containerColor != undefined){
				
				//check the screen and swicth
				if ( $('.screen2').css('display') == 'none' ){
					$('.screen1').hide();
					$('.screen2').show();

					console.log("show screen2");
				}else if($('.screen1').css('display') == 'none'){
					
					var segmentInputs; 
					var segments = $( ".addSegment" ).length + 1; //count segment amounts
					var json = "";

					for(i = 1; i < segments; i++){
						console.log('#segmentName' + i);
						var name = $('#segmentName' + i).val();
						var placeamount = $('#places'+ i).val();
						//console.log(i + " " + segments);
						
						if(i == segments-1){
							var record = '{"segment":"' + name + '", "placeAmount":"' + placeamount + '"}';	
						}else{
							var record = '{"segment":"' + name + '", "placeAmount":"' + placeamount + '"},';	
						}
						
						json += record;
					}
					json ='['+ json +']';
					console.log(json);
					// add to database

					$http.post("server/insert.php",{'subject': "addContainer", "containerName": $scope.containerName
	 ,"containerColor":  $scope.containerColor , "segment" : json })
					   .success(function (response) {
					   		console.log(response);
					   	});
					
					console.log("clicked on second next");
					$('#firstModal').foundation('reveal', 'close');
					//$location.path( "/storage-management" );
					}

				}else{
					alert("vul vereisde velden in..");
				}
		}

		$scope.addSegment = function(){
			//var segment = $('.addSegment').html();
			var plaatsen ;

			for (i = 1; i < plekken; i++) { 
				plaatsen += '<option value="' + i + '">' + i +'</option>';
			}

			var segments = $( ".addSegment" ).length + 1;

			var segment = '<div class="small-4 columns addSegment">';
			segment += '<div class="segmentTitle">Segment toevoegen</div>';
			segment += '<input type="text" name="segmentName'+ segments +'" id="segmentName'+ segments +'" placeholder="Segment Naam">';
			segment += '<select name="places'+ segments +'" id="places'+ segments +'">';
			segment += plaatsen;
			segment += '</select>';
			segment += '</div>';
			var segments = $( ".addSegment" ).length;
			$(".addSegment:last").after(segment);
			console.log(segments);
		}
	
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

