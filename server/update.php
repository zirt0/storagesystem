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

$company = $request->company;
$fname = $request->fname;
$lname = $request->lname;
$merk = $request->merk;
$tel = $request->tel;
$email = $request->email;

$LV_brand = $request->LV_brand;
$LV_type = $request->LV_type;
$LV_profile = $request->LV_profile;
$LV_tiresize = $request->LV_tiresize;

$RV_brand = $request->RV_brand;
$RV_type = $request->RV_type;
$RV_profile = $request->RV_profile;
$RV_tiresize = $request->RV_tiresize;

$LA_brand = $request->LA_brand;
$LA_type = $request->LA_type;
$LA_profile = $request->LA_profile;
$LA_tiresize = $request->LA_tiresize;

$RA_brand = $request->RA_brand;
$RA_type = $request->RA_type;
$RA_profile = $request->RA_profile;
$RA_tiresize = $request->RA_tiresize;
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

if($subject == "changeContractpos"){

	$sql = "UPDATE contracts SET container_contents_id = '" . $value . "' WHERE id = '" . $id . "'";
	$result = $conn->query($sql);
	


	$outp = $sql;
}

if($subject == "updateCustomer"){

	$sql = "UPDATE customers SET company = '" . $company . "', fname = '" . $fname . "', lname = '" . $lname . "', merk = '" . $merk . "', tel = '" . $tel . "', email = '" . $email . "' WHERE id = '" . $id . "'";
	$result = $conn->query($sql);
	


	$outp = $sql;
}

if($subject == "updateTireInfo"){

	$sql = "UPDATE tires SET LV_brand = '" . $LV_brand . "', LV_type = '" . $LV_type . "', LV_profile = '" . $LV_profile . "', LV_tiresize = '" . $LV_tiresize . "', RV_brand = '" . $RV_brand . "', RV_type = '" . $RV_type . "', RV_profile = '" . $RV_profile . "', RV_tiresize = '" . $RV_tiresize . "', LA_brand = '" . $LA_brand . "', LA_type = '" . $LA_type . "', LA_profile = '" . $LA_profile . "', LA_tiresize = '" . $LA_tiresize . "', RA_brand = '" . $RA_brand . "', RA_type = '" . $RA_type . "', RA_profile = '" . $RA_profile . "', RA_tiresize = '" . $RA_tiresize . "' WHERE id = '" . $id . "'";
	$result = $conn->query($sql);
	


	$outp = $sql;
}


$conn->close();

echo $outp;


?>