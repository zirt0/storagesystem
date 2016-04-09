<?php

include("config.php");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$subject = $request->subject;
$id = $request->id;
$data = $request->data;
$tirebrand = $request->tirebrand;
$containerId = $request->id;
$segmentName = $request->segmentName;


//print $subject;

if($subject == "remove_tire"){

	$sql = "DELETE FROM tire_brand WHERE brand=" . "'".$tirebrand . "'";
	$result = $conn->query($sql);
	$outp = $sql;
}

if($subject == "remove_container"){
		
	$sql = "DELETE container, container_content FROM container
			LEFT JOIN container_content
			ON container_content.container_id = container.id
			WHERE container.id =" . "'".$containerId . "'";
	$result = $conn->query($sql);
	$outp = $sql;
}

if($subject == "removeUser"){

	$sql = "DELETE FROM users WHERE id=" . "'".$data . "'";
	$result = $conn->query($sql);
	$outp = $sql;
}


if($subject == "remove_customer"){

	$sql = "DELETE FROM customers WHERE id=" . "'".$id . "'";
	$result = $conn->query($sql);
	$outp = $sql;
}

if($subject == "remove_contract"){

	$sql = "DELETE FROM contracts WHERE id=" . "'".$id . "'";
	$result = $conn->query($sql);
	$outp = $sql;
}

if($subject == "remove_tires"){

	$sql = "DELETE FROM tires WHERE id=" . "'".$id . "'";
	$result = $conn->query($sql);
	$outp = $sql;
}



if($subject == "removeSegment"){

	$sql = "DELETE FROM container_content WHERE container_id=" . "'".$id . "' AND container_department='" . $segmentName . "'";
	$result = $conn->query($sql);
	$outp = $sql;
}

$conn->close();

echo $outp;


	
?>
