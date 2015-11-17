<?php

include("config.php");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$subject = $request->subject;
$tirebrand = $request->tirebrand;

//print $subject;

if($subject == "insert_contract"){

	$sql = "INSERT INTO tire_brand (brand) VALUES ('".$tirebrand."')";
	$result = $conn->query($sql);
	$outp = $sql;
	$outp = "helloo ";
}

$conn->close();


echo $outp;


	
?>
