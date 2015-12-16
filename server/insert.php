<?php

include("config.php");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$subject = $request->subject;
$tirebrand = $request->tirebrand;

$segments = $request->segment;
$containerName = $request->containerName;
$containerColor = $request->containerColor;
$addUser = $request->addUsername;
$addPassword = $request->addPassword;
//print $subject;

if($subject == "insert_tire"){

	$sql = "INSERT INTO tire_brand (brand) VALUES ('".$tirebrand."')";
	$result = $conn->query($sql);
	$outp = $sql;
}

if($subject == "addUser"){

	$sql = "INSERT INTO users (name, password, status, role) VALUES ('".$addUser."', '" . $addPassword ."', '1', 'employer' )";
	$result = $conn->query($sql);
	$outp = $sql;
}



if($subject == "addContainer"){

	$sql = "INSERT INTO container (name, color) VALUES ('".$containerName."','".$containerColor."')";
	$result = $conn->query($sql);
	$containerid = $conn->insert_id; //get the id of inserted container

	
	$array = json_decode( $segments, true );
	foreach($array as $segment) { //foreach element in $arr

   	 	$segmentName = $segment['segment']; //etc
   	 	$placeAmount = $segment['placeAmount'];
   	 	
		//$data .=  "SegmentNaam " . $segmentName . " plaats " . $placeAmount ."<br>";
		for($i = 1; $i <= $placeAmount; $i++){
			$data .= $segmentName . " " . $i .". " ;
			$sql = "INSERT INTO container_content (place_name, container_id, container_department) VALUES ('".$i."','".$containerid."', '". $segmentName."')";
			$result = $conn->query($sql);
		}
		//forloop 

	}
	
	$outp = "1 " . $data ." 2 3" . " 4";
}

$conn->close();

echo $outp;

?>
