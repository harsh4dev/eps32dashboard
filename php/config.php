<?php
// EDIT THESE WITH YOUR ACTUAL DATABASE DETAILS
$host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "homey";

$conn = new mysqli($host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) { die("DB Connection Failed"); }
?>