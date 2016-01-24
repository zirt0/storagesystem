<?php

include("config.php");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$subject = $request->subject;
$id =  $request->id;
$value =  $request->value;
//print $subject

if($subject == "update_invoiceno"){

	$sql = "UPDATE contracts SET invoiceno = '".$value."' WHERE id = '".$id."'";
	$result = $conn->query($sql);
	$outp = $sql;
}

$conn->close();

echo $outp;


?>