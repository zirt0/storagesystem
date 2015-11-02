<?php

//include("config.php");

// mysql_connect("localhost", "root", "karlik") or die(mysql_error()); 

// mysql_select_db("storagesystem") or die(mysql_error()); 

$servername = "localhost";
$username = "root";
$password = "karlik";
$dbname = "storagesystem";

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM customers";
$result = $conn->query($sql);

$outp = "";
while($rs = $result->fetch_array()) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Name":"'  . $rs["company"] . '",';
    $outp .= '"City":"'   . $rs["fname"]        . '",';
    $outp .= '"Country":"'. $rs["lname"]     . '"}'; 
}
$outp ='{"records":['.$outp.']}';
var_dump($outp);
$conn->close();


$data = json_decode(file_get_contents("php://input"));

$fstname = mysql_real_escape_string($data->fstname);

$lstname = mysql_real_escape_string($data->password);



mysql_query("INSERT INTO users (name, password, status) VALUES ('$fstname', '$lstname', 1)"); 

Print "Your information has been successfully added to the database."; 