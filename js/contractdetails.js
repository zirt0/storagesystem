app.controller('contractsDetailsCtrl', ['$scope', '$rootScope', '$http' , '$routeParams', function ($scope, $rootScope, $http, $routeParams) {

		window.setTimeout(function(){

			$scope.$apply(function() {
				$rootScope.contractAddedSuccesfully = false;

        	 });
			console.log("change the contractAddedSuccesfully")

		}, 6000);

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