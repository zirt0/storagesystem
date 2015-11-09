<?php

include("config.php");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$subject = $request->subject;
$tirebrand = $request->tirebrand;

//print $subject;

if($subject == "remove_tire"){

	$sql = "DELETE FROM tire_brand WHERE brand=" . "'".$tirebrand . "'";
	$result = $conn->query($sql);
	$outp = $sql;
}

$conn->close();

echo $outp;


	
?>
