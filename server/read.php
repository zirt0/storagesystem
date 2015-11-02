<?php

include("config.php");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$subject = $request->subject;
$customerId = $request->customerId;

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

	$sql = "SELECT container_content.id, container_content.place_name, container_content.container_id, container_content.status, container.name, contracts.customer_id, contracts.start_date, contracts.end_date, customers.company
			FROM container_content
			JOIN contracts ON container_content.contracts_id=contracts.id
			JOIN customers ON contracts.customer_id=customers.id
			JOIN container ON container_content.container_id=container.id" ;
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    
	    $outp .= '{"id":"' . $rs["id"] . '",';
	    $outp .= '"company":"' . $rs["company"] . '",';
	    $outp .= '"place_name":"' . $rs["place_name"] . '",';
	    $outp .= '"name":"' . $rs["name"] . '",';//name of the container
	    $outp .= '"start_date":"' . $rs["start_date"] . '",';
	    $outp .= '"end_date":"' . $rs["end_date"] . '",';
	    $outp .= '"status":"'. $rs["status"]     . '"}'; 
	}
	$outp = $$outp ='{"records":['.$outp.']}'; ;
}

if($subject == "contracts"){

	$sql = "SELECT container_content.id, container_content.place_name, container_content.container_id, container_content.status, container.name, contracts.customer_id, contracts.start_date, contracts.end_date, customers.company
			FROM container_content
			JOIN contracts ON container_content.contracts_id=contracts.id
			JOIN customers ON contracts.customer_id=customers.id
			JOIN container ON container_content.container_id=container.id
			ORDER BY end_date ASC" ;
	$result = $conn->query($sql);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    
	    $outp .= '{"id":"' . $rs["id"] . '",';
	    $outp .= '"company":"' . $rs["company"] . '",';
	    $outp .= '"place_name":"' . $rs["place_name"] . '",';
	    $outp .= '"name":"' . $rs["name"] . '",';//name of the container
	    $outp .= '"start_date":"' . $rs["start_date"] . '",';
	    $outp .= '"end_date":"' . $rs["end_date"] . '",';
	    $outp .= '"status":"'. $rs["status"]     . '"}'; 
	}
	$outp = $$outp ='{"records":['.$outp.']}'; ;
}

$conn->close();

echo $outp;


	
?>
