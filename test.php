<?php
$servername = "localhost";
$username = "root";
$password = "karlik";
$dbname = "storagesystem";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT id, name, password FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
     $array_result = array();
    while($row = $result->fetch_assoc()) {
    	$array_result[] = $row;
        echo "id: " . $row["id"]. " - Name: " . $row["name"]. " " . $row["password"]. "<br>";
    }
} else {
    echo "0 results";
}

echo json_encode($array_result);
$conn->close();

// $data = file_get_contents("php://input");

// $objData = json_decode($data);

// $db = mysql_connect("localhost", "root", "karlik") or die ("Error connecting to     database.");
// mysql_select_db("storagesystem", $db) or die ("Couldn't select the database.");

// $results = mysql_query('SELECT * FROM "users" WHERE name = "adem"');


// $array_result = array();
// while($row = mysql_fetch_array($result)){    
//   $array_result[] = $row;
// }

// var_dump($array_result);
// echo json_encode($array_result);

// mysql_close($db);

