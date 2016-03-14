<?php

include("config.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$subject = $request->subject;
$username = $request->username;
$password = $request->password;
$customerId = $request->customerId;
$contractId = $request->contractId;
$sort = $request->sort;
$id = $request->id;
$tireid = $request->tireid;
$option_name = $request->option_name;
//print $subject;


if($subject == "login"){

	$sql = "SELECT * FROM users WHERE name = '" .  $username . "' AND password = '" . $password . "'"  ;
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"name":"'  . $rs["name"] . '",';
	    $outp .= '"role":"'  . $rs["role"] . '",';
	    $outp .= '"password":"'. $rs["password"]    . '"}'; 
	}
	
	$outp = $outp;
}

if($subject == "customers"){

	if($sort != ""){
		$sql = "SELECT * FROM customers ORDER BY id DESC LIMIT " . $sort;
	}else{
		$sql = "SELECT * FROM customers";
	}

	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"company":"'  . $rs["company"] . '",';
	    $outp .= '"fname":"'   . $rs["fname"]        . '",';
	    $outp .= '"lname":"'   . $rs["lname"]        . '",';
	    $outp .= '"kenteken":"'   . $rs["kenteken"]        . '",';
	    $outp .= '"tel":"'   . $rs["tel"]        . '",';
	    $outp .= '"date":"'   . $rs["date"]        . '",';
	    $outp .= '"merk":"'. $rs["merk"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
}


if($subject == "containerDepartment"){

	$sql = "SELECT container_department FROM container_content WHERE container_content.container_id = " . $id . " GROUP BY container_department";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"container_department":"'  . $rs["container_department"] . '"}';
	}
	$outp ='{"records":['.$outp.']}';
}

if($subject == "containerContent"){

	$sql = "SELECT container_content.id as id,container_content.place_name, container_content.container_department, contracts.id as contracts_id, customers.company, customers.fname, customers.lname FROM container_content
			LEFT JOIN contracts ON contracts.container_contents_id = container_content.id
			LEFT JOIN customers ON  contracts.customer_id = customers.id
			WHERE container_id = " . $id;
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"place_name":"'  . $rs["place_name"] . '",';
	    $outp .= '"container_id":"'   . $rs["container_id"]        . '",';
	    $outp .= '"contracts_id":"'   . $rs["contracts_id"]        . '",';
	    $outp .= '"company":"'   . $rs["company"]        . '",';
	    $outp .= '"fname":"'   . $rs["fname"]        . '",';
	    $outp .= '"lname":"'   . $rs["lname"]        . '",';
	    $outp .= '"container_department":"'   . $rs["container_department"]        . '",';
	    $outp .= '"status":"'. $rs["status"]    . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
}

if($subject == "containers"){

	// $sql = "SELECT container.id, name, color, COUNT(container_content.container_id) as places, (SELECT count(container_content.status) FROM container_content WHERE container_content.container_id = container.id AND container_content.contracts_id = 0 ) as free FROM container
	// 		INNER JOIN container_content
	// 		WHERE container_content.container_id = container.id
	// 		GROUP BY container.id";

	$sql = "SELECT container.id, name, color, COUNT(container_content.container_id) as places, 
			(SELECT count(container_content.id) FROM container_content
			LEFT JOIN contracts ON contracts.container_contents_id = container_content.id
			WHERE container_id = container.id AND (contracts.container_contents_id is null or contracts.container_contents_id = '') ) as free FROM container
			INNER JOIN container_content
 			WHERE container_content.container_id = container.id
			GROUP BY container.id";
	 $result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"name":"'  . $rs["name"] . '",';
	    $outp .= '"places":"'   . $rs["places"] . '",';
	    $outp .= '"free":"'   . $rs["free"] . '",';
	    $outp .= '"color":"'. $rs["color"] . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}



if($subject == "customerInfo"){

	$sql = "SELECT * FROM customers WHERE id =" . $customerId ;
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"company":"'  . $rs["company"] . '",';
	    $outp .= '"fname":"'   . $rs["fname"]        . '",';
	    $outp .= '"lname":"'   . $rs["fname"]        . '",';
	    $outp .= '"kenteken":"'   . $rs["kenteken"]        . '",';
	    $outp .= '"merk":"'   . $rs["merk"]        . '",';
	    $outp .= '"tel":"'   . $rs["tel"]        . '",';
	    $outp .= '"regdate":"'. $rs["date"]     . '"}'; 
	}
	$outp = $outp ;
}

if($subject == "users"){

	$sql = "SELECT * FROM users" ;
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    
	    $outp .= '{"id":"' . $rs["id"] . '",';
	    $outp .= '"name":"' . $rs["name"] . '",';
	    $outp .= '"password":"' . $rs["password"] . '",';
	    $outp .= '"role":"' . $rs["role"] . '",';
	    $outp .= '"status":"'. $rs["status"]     . '"}'; 
	}
	$outp = $outp ='{"records":['.$outp.']}'; ;
}

if($subject == "container"){

	$sql = "SELECT users.name as employer, container_content.id, container_content.place_name, container_content.container_id, container_content.status, container.name, contracts.id as contract_id, contracts.customer_id, contracts.start_date, contracts.end_date, customers.company
			FROM container_content
			LEFT JOIN contracts ON container_content.contracts_id=contracts.id
			LEFT JOIN customers ON contracts.customer_id=customers.id
			LEFT JOIN users ON contracts.id = users.name
			JOIN container ON container_content.container_id=container.id" ;
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    
	    $outp .= '{"id":"' . $rs["id"] . '",';
	    $outp .= '"company":"' . $rs["company"] . '",';
	    $outp .= '"place_name":"' . $rs["place_name"] . '",';
	    $outp .= '"name":"' . $rs["name"] . '",';//name of the container contract_id
	    $outp .= '"start_date":"' . $rs["start_date"] . '",';
	    $outp .= '"end_date":"' . $rs["end_date"] . '",';
	    $outp .= '"customer_id":"' . $rs["customer_id"] . '",';
	    $outp .= '"contract_id":"' . $rs["contract_id"] . '",';
	    $outp .= '"employer":"' . $rs["employer"] . '",';
	    $outp .= '"status":"'. $rs["status"]     . '"}'; 
	}
	$outp = $$outp ='{"records":['.$outp.']}'; ;
}

if($subject == "contracts"){

	$condition = "";

	if($customerId != false){
		$condition = 'WHERE customer_id = "' . $customerId . '"';
	}

	//sort contracts on end date
	$sql = "SELECT contracts.id, customer_id, employer, start_date, end_date, container_contents_id, invoiceno, 
				customers.company, customers.fname, customers.lname, tires.sezon,
				LV_brand, RV_brand, LA_brand, RA_brand,
				LV_type, RV_type, LA_type, RA_type,
				LV_profile, RV_profile, LA_profile, RA_profile,
				LV_tiresize, RV_tiresize, LA_tiresize, RA_tiresize,
				flatrun, velg, comment,
				container_content.container_department, container.name, container.color,
				users.name as username
				FROM contracts
				LEFT JOIN customers ON contracts.customer_id = customers.id
				LEFT JOIN tires ON contracts.tires_id = tires.id
				LEFT JOIN container_content ON container_contents_id = container_content.id
				LEFT JOIN container ON container_content.container_id = container.id
				LEFT JOIN users ON contracts.employer = users.id
				" . $condition . " 
			ORDER BY end_date ASC" ;
	

	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    
	    $outp .= '{"id":"' . $rs["id"] . '",';
	    $outp .= '"company":"' . $rs["company"] . '",';
	    $outp .= '"place_name":"' . $rs["place_name"] . '",';
	    $outp .= '"name":"' . $rs["name"] . '",';//name of the container contract_id
		$outp .= '"container_contents_id":"' . $rs["container_contents_id"] . '",';
	    $outp .= '"container_department":"' . $rs["container_department"] . '",';
	    $outp .= '"start_date":"' . $rs["start_date"] . '",';
	    $outp .= '"end_date":"' . $rs["end_date"] . '",';
	    $outp .= '"invoiceno":"' . $rs["invoiceno"] . '",';
	    $outp .= '"contract_id":"' . $rs["contract_id"] . '",';
	    $outp .= '"username":"' . $rs["username"] . '",';
	    $outp .= '"status":"'. $rs["status"]     . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
	//$outp = $sql;
}

if($subject == "contractdetail"){

	//sort contracts on end date
	$sql = 'SELECT contracts.id, contracts.kenteken, customer_id, employer, start_date, end_date, container_contents_id, invoiceno, 
				customers.company, customers.fname, customers.lname, customers.merk, customers.tel, tires.sezon,
				LV_brand, RV_brand, LA_brand, RA_brand,
				LV_type, RV_type, LA_type, RA_type,
				LV_profile, RV_profile, LA_profile, RA_profile,
				LV_tiresize, RV_tiresize, LA_tiresize, RA_tiresize,
				flatrun, velg, comment,
				container_content.container_department, container.name, container.color
				FROM contracts
				LEFT JOIN customers ON contracts.customer_id = customers.id
				LEFT JOIN tires ON contracts.tires_id = tires.id
				LEFT JOIN container_content ON container_contents_id = container_content.id
				LEFT JOIN container ON container_content.container_id = container.id';
				if($contractId != ""){
					$sql .= ' WHERE contracts.id =' . $contractId;
				}
				
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    
	    $outp .= '{"id":"' . $rs["id"] . '",';
	    //brand
	    $outp .= '"LV_brand":"' . $rs["LV_brand"] . '",';
	    $outp .= '"RV_brand":"' . $rs["RV_brand"] . '",';
	    $outp .= '"LA_brand":"' . $rs["LA_brand"] . '",';
	    $outp .= '"RA_brand":"' . $rs["RA_brand"] . '",';
		//type
	    $outp .= '"LV_type":"' . $rs["LV_type"] . '",';
	    $outp .= '"RV_type":"' . $rs["RV_type"] . '",';
	    $outp .= '"LA_type":"' . $rs["LA_type"] . '",';
	    $outp .= '"RA_type":"' . $rs["RA_type"] . '",';
	    //profile
	    $outp .= '"LV_profile":"' . $rs["LV_profile"] . '",';
	    $outp .= '"RV_profile":"' . $rs["RV_profile"] . '",';
	    $outp .= '"LA_profile":"' . $rs["LA_profile"] . '",';
	    $outp .= '"RA_profile":"' . $rs["RA_profile"] . '",';
	    //profile
	    $outp .= '"LV_tiresize":"' . $rs["LV_tiresize"] . '",';
	    $outp .= '"RV_tiresize":"' . $rs["RV_tiresize"] . '",';
	    $outp .= '"LA_tiresize":"' . $rs["LA_tiresize"] . '",';
	    $outp .= '"RA_tiresize":"' . $rs["RA_tiresize"] . '",';
	    //$outp .= '"tire_profile":"' . $rs["tire_profile"] . '",';
	    //$outp .= '"sezon":"' . $rs["sezon"] . '",';
	    //$outp .= '"type":"' . $rs["type"] . '",';
	    $outp .= '"flatrun":"' . $rs["flatrun"] . '",';
	    $outp .= '"sezon":"' . $rs["sezon"] . '",';
	    $outp .= '"velg":"' . $rs["velg"] . '",';

	   	$outp .= '"start_date":"' . $rs["start_date"] . '",';
	    $outp .= '"end_date":"' . $rs["end_date"] . '",';
	    $outp .= '"invoiceno":"' . $rs["invoiceno"] . '",';
	    
	    $outp .= '"company":"' . $rs["company"] . '",';
	    $outp .= '"lname":"' . $rs["lname"] . '",';
	    $outp .= '"fname":"' . $rs["fname"] . '",';
	    $outp .= '"merk":"' . $rs["merk"] . '",';
	    $outp .= '"kenteken":"' . $rs["kenteken"] . '",';
	    $outp .= '"tel":"' . $rs["tel"] . '",';
	    $outp .= '"customer_id":"' . $rs["customer_id"] . '",';
	    
	    $outp .= '"container_contents_id":"' . $rs["container_contents_id"] . '",';
	    $outp .= '"container_department":"' . $rs["container_department"] . '",';
	    $outp .= '"name":"' . $rs["name"] . '",';
	    $outp .= '"color":"' . $rs["color"] . '",';

	    $outp .= '"employer":"' . $rs["employer"] . '",';
	    $outp .= '"comment":"'. $rs["comment"]     . '"}'; 
	    //$outp = "adeemm";
	    
	}
	$outp ='{"records":['.$outp.']}'; ;
	//$outp = $sql ;
}

if($subject == "noInvoice"){

	//sort contracts on end date
	$sql = 'SELECT *, customers.company, contracts.id as sortId FROM contracts
			JOIN customers ON contracts.customer_id = customers.id
			WHERE invoiceno IS NULL ORDER BY sortId DESC LIMIT ' . $sort;

	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    
	    $outp .= '{"id":"' . $rs["sortId"] . '",';
	    $outp .= '"company":"' . $rs["company"] . '",';
	    $outp .= '"customer_id":"' . $rs["customer_id"] . '",';
	    $outp .= '"date":"'. $rs["date"]     . '"}'; 
	    //brand
	    //$outp = "adeemm";
	    
	}
	 $outp ='{"records":['.$outp.']}'; ;
	//$outp = $adem ;

	//$outp = $sql;
}


if($subject == "tire_brands"){

	//sort contracts on end date
	$sql = 'SELECT brand FROM tire_brand';

	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    
	    $outp .= '{"text":"'. $rs["brand"]     . '"}'; 
	    //$outp = "adeemm";
	    
	}
	 $outp ='{"records":['.$outp.']}'; ;
	//$outp = $adem ;

	//$outp = $sql;
}

if($subject == "sortLowProfile"){

	//sort contracts on end date
	$sql = "SELECT *, customers.company, customers.id as customerId FROM tires 
			JOIN contracts ON tires.contract_id = contracts.id
			JOIN customers ON contracts.customer_id = customers.id
			WHERE LV_profile <= 1 OR RV_profile <= 1 OR LA_profile <= 1 OR RA_profile <= 1
			ORDER BY tires.id DESC LIMIT " . $sort;

	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    
	    $outp .= '{"id":"' . $rs["id"] . '",';
	    $outp .= '"company":"' . $rs["company"] . '",';
	    $outp .= '"customer_id":"' . $rs["customerId"] . '",';
	    $outp .= '"LV_profile":"' . $rs["LV_profile"] . '",';
	    $outp .= '"RV_profile":"' . $rs["RV_profile"] . '",';
	    $outp .= '"LA_profile":"' . $rs["LA_profile"] . '",';
	    $outp .= '"RA_profile":"' . $rs["RA_profile"] . '"}';
	}
	 $outp ='{"records":['.$outp.']}';
	 //$outp = $sql;
}

if($subject == "options"){

	//sort contracts on end date
	$sql = 'SELECT * FROM options';
				
				
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    
	    $outp .= '{"option_name":"' . $rs["option_name"] . '",';
	    $outp .= '"option_value":"'. $rs["option_value"]     . '"}'; 
	    //$outp = "adeemm";
	    
	}
	$outp ='{"records":['.$outp.']}'; ;
	//$outp = $sql ;
}



if($subject == "profilecolors"){
	$sql = "SELECT option_value FROM options WHERE option_name = 'redTire'";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    
	    $outp .= '{"option_value":"' . $rs["option_value"] . '"}';

	}
	$outp = $outp ;
	
	// $outp = $sql;
}


$conn->close();

echo $outp;
	
?>
