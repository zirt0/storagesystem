<?php

include("config.php");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$subject = $request->subject;
$customerId = $request->customerId;
$contractId = $request->contractId;

//print $subject;

if($subject == "customers"){

	$sql = "SELECT * FROM customers";
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $rs["id"] . '",';
	    $outp .= '"company":"'  . $rs["company"] . '",';
	    $outp .= '"fname":"'   . $rs["fname"]        . '",';
	    $outp .= '"lname":"'. $rs["lname"]     . '"}'; 
	}
	$outp ='{"records":['.$outp.']}';
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
	$outp = $$outp ='{"records":['.$outp.']}'; ;
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

	//sort contracts on end date
	$sql = "SELECT container_content.id, container_content.place_name, container_content.container_id, container_content.status, container.name as container_name, contracts.id as contract_id,  contracts.customer_id, contracts.start_date, contracts.end_date, customers.company, users.name
			FROM container_content
			JOIN contracts ON container_content.contracts_id=contracts.id
			JOIN customers ON contracts.customer_id=customers.id
			JOIN container ON container_content.container_id=container.id
			JOIN users ON contracts.employer = users.id
			ORDER BY end_date ASC" ;
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    
	    $outp .= '{"id":"' . $rs["id"] . '",';
	    $outp .= '"container_name":"' . $rs["container_name"] . '",';
	    $outp .= '"company":"' . $rs["company"] . '",';
	    $outp .= '"place_name":"' . $rs["place_name"] . '",';
	    $outp .= '"name":"' . $rs["name"] . '",';//name of the container contract_id
	    $outp .= '"start_date":"' . $rs["start_date"] . '",';
	    $outp .= '"end_date":"' . $rs["end_date"] . '",';
	    $outp .= '"contract_id":"' . $rs["contract_id"] . '",';
	    $outp .= '"user_name":"' . $rs["name"] . '",';
	    $outp .= '"status":"'. $rs["status"]     . '"}'; 
	}
	$outp = $$outp ='{"records":['.$outp.']}'; ;
}

if($subject == "contractdetail"){

	//sort contracts on end date
	$sql = 'SELECT tires.id, tires.sezon, tires.tire_profile, tires.type, tires.comment, contracts.start_date, contracts.end_date, customers.company, customers.id as customer_id FROM tires
JOIN contracts ON tires.contract_id = contracts.id
JOIN customers ON contracts.customer_id = customers.id
WHERE contract_id =' . $contractId;
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    
	    $outp .= '{"id":"' . $rs["id"] . '",';
	    $outp .= '"tire_profile":"' . $rs["tire_profile"] . '",';
	    $outp .= '"sezon":"' . $rs["sezon"] . '",';
	    $outp .= '"type":"' . $rs["type"] . '",';
	   	$outp .= '"start_date":"' . $rs["start_date"] . '",';
	    $outp .= '"end_date":"' . $rs["end_date"] . '",';
	    $outp .= '"company":"' . $rs["company"] . '",';
	    $outp .= '"customer_id":"' . $rs["customer_id"] . '",';
	    $outp .= '"comment":"'. $rs["comment"]     . '"}'; 
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

$conn->close();

echo $outp;


	
?>
