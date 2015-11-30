<?php

include("config.php");


$postdata 	= file_get_contents("php://input");
$request	= json_decode($postdata);
$subject 	= $request->subject;
$company_id = $request->company_id;
$sezoen 	= $request->sezoen;
$velg 		= $request->velg;
$flatrun 	= $request->flatrun;

$lv_profile = $request->lv_profile;
$rv_profile = $request->rv_profile;
$la_profile = $request->la_profile;
$ra_profile = $request->ra_profile;

$lv_bandenmaat = $request->lv_bandenmaat;
$rv_bandenmaat = $request->rv_bandenmaat;
$la_bandenmaat = $request->la_bandenmaat;
$ra_bandenmaat = $request->ra_bandenmaat;

$lv_merk = $request->lv_merk;
$rv_merk = $request->rv_merk;
$la_merk = $request->la_merk;
$ra_merk = $request->ra_merk;

$lv_bandtype = $request->lv_bandtype;
$rv_bandtype = $request->rv_bandtype;
$la_bandtype = $request->la_bandtype;
$ra_bandtype = $request->ra_bandtype;

$startdate = $request->startdate;
$enddate = $request->enddate;
$duration = $request->duration;
$image = $request->image;
$comment = $request->comment;

//print $subject;

if($subject == "insert_contract"){

	$sql = "INSERT INTO contracts (customer_id, employer, start_date, end_date, container_contents_id) VALUES ('10','12', '" . $startdate . "', '" . $enddate ."', '0' )";
	$result = $conn->query($sql);
	$contractid = $conn->insert_id;

	$outp = $contractid;
}

$conn->close();


echo $outp;


	
?>
