function addnewcustomerFnc($scope, $http){

	$scope.addCustomerFunction = function(){
		console.log("addCustomer pressed");

		$scope.addCustomer = true;

	};

	$scope.addNewCustomer = function(){

		$scope.errorcount = 0;
		jQuery(".addNewCustomer input.req").each(function(){
			
			++$scope.errorcount;
			isFormValid = true;
			if (jQuery(this).val() == '') { 
				console.log("5");
				jQuery(this).addClass('highlight');
				
				isFormValid = false;
				
			}else{
				console.log("6");
				//console.debug(this);
				jQuery(this).removeClass('highlight	');
				--$scope.errorcount
				//isFormValid = true;
			}
		});

		console.log("error count " + $scope.errorcount);

		//is for test
		//isFormValid = true;
		
		if($scope.errorcount != 0){
			
			alert("Vult u a.u.b. de vereisde velden in.");
			console.log("3");
		  	//jQuery('input.req').css({'border': '1px solid red'});
		  	return false;
		  	
		}else {
		  	console.log("4");
			//gaverder();
			$scope.insertCustomerDB();
			console.log($scope.addNewCompany);
			return false;
		}
	}

	$scope.insertCustomerDB = function(){
		console.log($scope.addNewCompany);
		
		$http.post("server/insertcontract.php",{
		'subject': "insert_newcustomer",
		'company': '' + $scope.addNewCompany + '' ,
		'fname': '' + $scope.addNewfName + '' ,
		'lname': '' + $scope.addNewlName + '' ,
		'kenteken': '' + $scope.addNewLicense + '' ,

		'merk': '' + $scope.addNewBrand + '',
		'tel': '' + $scope.addNewPhone + '',
		'date': '' + $scope.addNewLicense + '',

		'email': '' + $scope.addNewEmail + ''


		})
		.success(function (response){
			$scope.a = response;
			console.log($scope.a);
			$scope.selectCustomer(response.id, response.company , response.lname  );
			$scope.addCustomer = false;

			//$location.path("/contracts/" + $scope.a);
		});

	};
}