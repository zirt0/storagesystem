	app.controller('newProductCtrl', ['$rootScope', '$scope', '$http', '$rootScope', 'Upload', '$timeout', function( $rootScope, $scope, $http, $rootScope, Upload, $timeout){
		
		$scope.bandprofiel = true;
		$scope.bandmaat = true;
		$scope.bandmerk = true;
		$scope.bandtype = true;
		$scope.velg = true;
		$scope.viermerk = true;
		$scope.vierprofiel = true;
		//$scope.flatrun = false;
		//$scope.contract(6);

		/////
		$scope.uploadFiles = function (files) {
			console.log("")
			$scope.files = files;
			if (files && files.length) {
				Upload.upload({
					url: '#/uploaded/',
					data: {
						files: files
					}
				}).then(function (response) {
					$timeout(function () {
						$scope.result = response.data;
					});
				}, function (response) {
					if (response.status > 0) {
						$scope.errorMsg = response.status + ': ' + response.data;
					}
				}, function (evt) {
					$scope.progress = 
					Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
			}
		};
	    ///selectcontainer

	    $http.post("server/read.php",{'subject': 'containers'})
	    .success(function (response){
	    	$scope.containers = response.records;
	    	console.log($scope.containers);
	    });

	    $scope.selectContainer = function(id){
	    	$scope.idContainer = id;
	    	$scope.containerContentsId = "";
	    	$('html, body').animate({ scrollTop:$(".contents").offset()}, 500);


	    	$http.post("server/read.php",{'subject': "containerContent", 'id': $scope.idContainer })

	    	.success(function (response) {

		      //console.log(response);
		      $scope.places = response.records;
		      // $scope.company = $scope.customerInfo['company']

		      $('html,body').animate({
		      	scrollTop: $("#contents").offset().top
		      });
		  });

	    }

	    $scope.placesSelected = function(id) {

	    	console.log("Selected id  " + id);
	    	$scope.containerContentsId = id;
	    	console.log("Selected id  " + $scope.containerContentsId);
	    	$("button").removeClass("selectedContainer");
	    	$("#place" + id + "").addClass("selectedContainer");
	    }


		//end selectcontainer

		function animateOut(element_ID, animation) {
			console.log("animatee", element_ID);
			$(element_ID).addClass("animated "+animation);
	        //$(element_ID).hide();
	        var wait = window.setTimeout( function(){
	        	$(element_ID).removeClass(animation);
	        	$(element_ID).hide();

	        }, 1300

	        );
	    }

	    function animateIn(element_ID, animation) {
	    	console.log("animatee11", element_ID);
	    	$(element_ID).show();
	    	$(element_ID).addClass("animated "+animation);
	        //$(element_ID).hide();
	        var wait = window.setTimeout( function(){

	        	$(element_ID).removeClass(animation);


	        }, 1300

	        );
	    }

	    $scope.addContainer = function() {

	    	isFormValid = true;
			jQuery("input.req, select.req ").each(function(){
				if (jQuery(this).val() == '') { 
					console.log("5");
					jQuery(this).addClass('highlight');
					
					isFormValid = false;
					
				}else{
					console.log("6");
					jQuery(this).removeClass('highlight	');
					isFormValid = true;
				}
			});
			
			
			if(!isFormValid){
				
				alert("Vult u a.u.b. de vereisde velden in.");
				console.log("3");
				  	//jQuery('input.req').css({'border': '1px solid red'});
				  	return false;
				  	
				  }else {
				  	console.log("4");
					//gaverder();
					//$scope.insertContractDB();
					animateOut(".newProduct", 'flipOutX');
	    			animateIn(".addToContainer", 'flipInX');
					return false;
				}
	    	

	    	

	    }

	    $scope.submit = function() {
	    	if (form.file.$valid && $scope.file) {
	    		$scope.upload($scope.file);
	    	}
	    };

		    // upload on file select or drop
		    $scope.upload = function (file) {
		    	console.log("asdasd " + file)
		    	Upload.upload({
		    		url: '/uploaded/',
		    		data: {file: file, 'username': $scope.username}
		    	}).then(function (resp) {
		    		console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
		    	}, function (resp) {
		    		console.log('Error status: ' + resp.status);
		    	}, function (evt) {
		    		var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		    		console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		    	});
		    };
		    // for multiple files:
		    $scope.uploadFiles = function (files) {
		    	if (files && files.length) {
		    		for (var i = 0; i < files.length; i++) {
		          //Upload.upload({..., data: {file: files[i]}, ...})...;
		      }
		        // or send them all together for HTML5 browsers:
		        //Upload.upload({..., data: {file: files}, ...})...;
		    }
		}
		/////
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

		$scope.$watch('bandmaat1', function(v){

			if ($scope.bandmaat){
				//console.debug("waarde band1 " + v);
				$scope.bandmaat2 = v;
				$scope.bandmaat3 = v;
				$scope.bandmaat4 = v;
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
		
		console.log($scope.stardate);

		$scope.bandenmaat = "";

		$scope.submitContract = function(){
			console.log("submitContract is pressed");
			
			isFormValid = true;
			jQuery("input.req, select.req ").each(function(){
				if (jQuery(this).val() == '') { 
					console.log("5");
					jQuery(this).addClass('highlight');

					isFormValid = false;

				}else{
					console.log("6");
					jQuery(this).removeClass('highlight	');
					isFormValid = true;
				}
			});


			if(!isFormValid){

				alert("Vult u a.u.b. de vereisde velden in.");
				console.log("3");
				  	//jQuery('input.req').css({'border': '1px solid red'});
				  	return false;
				  	
				  }else {
				  	console.log("4");
					//gaverder();
					$scope.insertContractDB();
					return false;
				}
			}

			$scope.insertContractDB = function(){

				console.log($scope.containerContentsId);
				$http.post("server/insertcontract.php",{
					'subject': "insert_contract",
					'company_id': '' + $scope.company_id + '' ,
					'sezoen': '' + $scope.sezoen + '' ,
					'velg': '' + $scope.velg + '' ,
					'flatrun': '' + $scope.flatrun + '' ,
				//profiel
				'lv_profile': '' + $scope.bandprofiel1 + '' ,
				'rv_profile': '' + $scope.bandprofiel2 + '' ,
				'la_profile': '' + $scope.bandprofiel3 + '' ,
				'ra_profile': '' + $scope.bandprofiel4 + '' ,
				//bandenmaat
				'lv_bandenmaat': '' + $scope.bandmaat1 + '' ,
				'rv_bandenmaat': '' + $scope.bandmaat2 + '' ,
				'la_bandenmaat': '' + $scope.bandmaat3 + '' ,
				'ra_bandenmaat': '' + $scope.bandmaat4 + '' ,
				//merk
				'lv_merk': '' + $scope.bandenmerk1 + '' ,
				'rv_merk': '' + $scope.bandenmerk2 + '' ,
				'la_merk': '' + $scope.bandenmerk3 + '' ,
				'ra_merk': '' + $scope.bandenmerk4 + '' ,
				//bandentype
				'lv_bandtype': '' + $scope.bandtype1 + '',
				'rv_bandtype': '' + $scope.bandtype2 + '',
				'la_bandtype': '' + $scope.bandtype3 + '',
				'ra_bandtype': '' + $scope.bandtype4 + '',

				'startdate': '' + $scope.startdate + '',
				'enddate': '' + $scope.enddate + '',
				'duration': '' + $scope.duration + '',
				'image': '' + $scope.duration + '',
				'comment': '' + $scope.comment + '',

				'container_contents_id': '' + $scope.containerContentsId + ''


			})
	.success(function (response){
		$scope.a = response;
		console.log("contract inserted " + $scope.a);
	});

};

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
}]);