app.controller('contractsDetailsCtrl', ['$scope', '$rootScope', '$http' , '$routeParams', '$location', function ($scope, $rootScope, $http, $routeParams, $location) {

		$scope.testfields = function(){

	    	console.debug($scope.edit_lvprofile);

	    }

		window.setTimeout(function(){

			$scope.$apply(function() {
				$rootScope.contractAddedSuccesfully = false;

        	 });
			console.log("change the contractAddedSuccesfully")
			$scope.getinfoOption();

		}, 3000);

		$scope.idContract = "" + $routeParams.id + "";
		
		$scope.invoicestatus = function(number){
			
			if(number != ""){
				return "green";
			}else{
				return "red";
			}
		};

		$scope.conditionTF = function(value){
			console.debug(value);

			if(value == "true"){
				return "Aanwezig";
			}else if(value == "false"){

				return "Geen";
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

		$scope.removefromContainer = function(id){

			var r = confirm("Weet u zeker dat u de banden wilt uit de container?");
		    if (r == true) {
				console.log("Ja hij wilt verwijderen." + id);
				$http.post("server/update.php",{'subject': "removefromcontainer", 'value': id})
			
				.success(function (response) {

					$scope.contractDetail = response.records;
					console.log(response);
				});
		    
		    }     
		}

		$scope.getinfoOption = function(){

			var options = $rootScope.options;
			console.log("getttt optionn")
			console.log($rootScope.options);	
			for(var x in options){
				console.log("Get option value " + x + " " + options[x]);
				for(var y in options[x]){
					console.log("Get Y of optons " + y.option_name )
				}
			}

		}

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


		$scope.changeContainerPosition = function(positionId){
			
			console.log(positionId);

			var r = confirm("Weet u zeker dat u de bandenpositie wilt wijzigen?");
			if (r == true) {

				animateOut(".contractDetailsPage", 'slideOutRight');
    			animateIn(".addToContainer", 'slideOutRight');

    			$http.post("server/read.php",{'subject': 'containers'})
			    .success(function (response){
			    	$scope.containers = response.records;
			    	console.log($scope.containers);
			    });

			} else {
				
			}	

		}

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

	    $scope.submitContractPoistioinChange = function(){

	    	//change in database the position of the 

	    	if($scope.containerContentsId == false){
	    		alert("kies een nieuwe plaats!");

	    		return false;
	    	}

	    	$http.post("server/update.php",{'subject': "changeContractpos", 'value': $scope.containerContentsId , 'id': $scope.idContract})
			
			.success(function (response) {

				console.log(response);

				
				 location.reload();
				 $rootScope.contractAddedSuccesfully = true;
				//$location.path("/contracts/" + $scope.idContract);
				//show message on contract page
				
			});


	    }



		
		//$rootScope.getOptions('redTire');

		//console.log($rootScope.redProfile);
	}]);