app.controller('contractsDetailsCtrl', ['$scope', '$rootScope', '$http' , '$routeParams', function ($scope, $rootScope, $http, $routeParams) {

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

		
		//$rootScope.getOptions('redTire');

		//console.log($rootScope.redProfile);
	}]);