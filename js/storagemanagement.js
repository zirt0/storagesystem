app.controller('storagemanagementCtrl', function($scope, $http, $rootScope, ModalService){

  ////////test purposee/////
  
  $rootScope.loadContainers();

  $rootScope.$watch('containersCheck', function() {
        console.log('1111hey, myVar has changed!' + $rootScope.containersCheck);
         //$rootScope.loadContainers();
         if($rootScope.containersCheck == 1){

            setTimeout(function(){ $rootScope.loadContainers(); }, 3000);
          
          console.log('Load containers');

          $rootScope.containersCheck = 0;
         }
    });

  $rootScope.refreshContainer = function(){
     $rootScope.loadContainers();
  }
	
		
});

app.controller('containerContentCtrl', ['$scope', '$http' , '$routeParams', '$location', function ($scope, $http,  $routeParams, $location) {

	$scope.idContainer = $routeParams.id;
	console.log($scope.idContainer);


  $http.post("server/read.php",{'subject': "containerContent", 'id': $scope.idContainer })

    .success(function (response) {

      //console.log(response);
      $scope.places = response.records;

      // $scope.company = $scope.customerInfo['company']
  });

  $scope.deleteContainer  = function(){
    
    var r = confirm("Weet u zeker dat u deze container wilt verwijderen?");
    if (r == true) {
      $http.post("server/remove.php",{'subject': "remove_container", 'id': $scope.idContainer })
      .success(function (response) {

        console.log(response);
        $location.path( "/storage-management" );
      });
    
    }     
 } 

   $scope.occupy  = function(status){

   		if(status == "" || status == 0){

   			return "Vrij";

   		}else{
   			return "Bezet";   		
   		}
   }
}]);