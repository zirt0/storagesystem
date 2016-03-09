	app.controller('addContainer', function($scope, $rootScope, $http, $location) {
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
			           $rootScope.loadContainers();  					 
					
					console.log("clicked on second next");
					$('#firstModal').foundation('reveal', 'close');
					//$location.path( "/storage-management" );
					$rootScope.containersCheck = 1;
					
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