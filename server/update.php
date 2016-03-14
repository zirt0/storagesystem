<?php

include("config.php");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$subject = $request->subject;
$id =  $request->id;
$value =  $request->value;
$option_name = $request->option_name;
$option_value = $request->option_value;
$redTire = $request->redTire;
$orangeTire = $request->orangeTire;
$greenTire = $request->greenTire;
//print $subject

if($subject == "update_invoiceno"){

	$sql = "UPDATE contracts SET invoiceno = '".$value."' WHERE id = '".$id."'";
	$result = $conn->query($sql);
	$outp = $sql;
}


if($subject == "options"){

	$sql = "UPDATE options SET option_value = '".$option_value."' WHERE option_name = '".$option_name."'";
	$result = $conn->query($sql);
	$outp = $sql;
}

if($subject == "saveTires"){

	$sql = "UPDATE options SET option_value = '".$redTire."' WHERE option_name = 'redTire'";
	$result = $conn->query($sql);

	$sql = "UPDATE options SET option_value = '".$orangeTire."' WHERE option_name = 'orangeTire'";
	$result = $conn->query($sql);

	$sql = "UPDATE options SET option_value = '".$greenTire."' WHERE option_name = 'greenTire'";
	$result = $conn->query($sql);
	


	$outp = $sql;
}

if($subject == "removefromcontainer"){

	$sql = "UPDATE contracts SET container_contents_id = '0' WHERE id = '" . $value . "'";
	$result = $conn->query($sql);
	


	$outp = $sql;
}


$conn->close();

echo $outp;


?>