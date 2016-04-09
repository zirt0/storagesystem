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
  var plekken = 51;

	console.log($scope.idContainer);


  $http.post("server/read.php",{'subject': "containerContent", 'id': $scope.idContainer })

    .success(function (response) {

      console.log("TEEEEESSTTT");
      console.log(response);
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

 $scope.addSegment = function(){
    //var segment = $('.addSegment').html();
    var plaatsen ;

    for (i = 1; i < plekken; i++) { 
      plaatsen += '<option value="' + i + '">' + i +'</option>';
    }

    var segments = $( ".addSegmentCon" ).length;

    var segment = '<div class="small-4 columns addSegmentCon">';
    segment += '<div class="segmentTitle">Segment toevoegen</div>';
    segment += '<input type="text" name="segmentNames'+ segments +'" id="segmentNames'+ segments +'" placeholder="Segment Naam">';
    segment += '<select name="places'+ segments +'" id="places'+ segments +'">';
    segment += plaatsen;
    segment += '</select>';
    segment += '</div>';
    //var segments = $( ".addSegmentCon" ).length;
    $(".containerCon:last").after(segment);
    console.log(segments);
  }

$scope.saveSegments = function(){
  console.log("test " + $('input#segmentName1').val());

  //get the id of the container
  //$scope.idContainer
  var segmentInputs; 
  var segments = $( ".addSegmentCon" ).length; //count segment amounts
  console.log("Segs " + segments)
  var json = "";

  console.debug(segments);

  for(i = 0; i < segments; i++){
    console.log('#segmentNames' + i);
    var name = $('#segmentNames' + i).val();
    var placeamount = $('#places'+ i).val();
    //console.log(i + " " + segments);
    
    if(i == segments-1){
      var record = '{"segment":"' + name + '", "placeAmount":"' + placeamount + '"}'; 
      console.log("first");
    }else{
      var record = '{"segment":"' + name + '", "placeAmount":"' + placeamount + '"},';  
      console.log("second");
    }
    
    json += record;
  }
  json ='['+ json +']';
  console.log(json);

  $http.post("server/insert.php",{'subject': "addSegment", "id": $scope.idContainer
   , "segment" : json })
   .success(function (response) {
      console.log(response);
      location.reload();
    });

  //check is everything is filled in

  //if everything is filled in  

}


  $scope.removeContainer = function(naam){

    console.log("Segmentnaam " + naam + " containernaamId " + $scope.idContainer);
var r = confirm("Weet u zeker dat u deze segment wilt verwijderen, alle gegevens in deze segment worden verwijderd.");
    if (r == true) {
      $http.post("server/remove.php",{'subject': "removeSegment", "id": $scope.idContainer, "segmentName": naam })
     .success(function (response) {
        console.log(response);
        location.reload();
      });
    }
    
  }

}]);