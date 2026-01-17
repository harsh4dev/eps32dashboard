<?php
header('Content-Type: application/json');
include 'config.php';

$sql = "SELECT * FROM (SELECT * FROM solar_logs ORDER BY id DESC LIMIT 15) Var1 ORDER BY id ASC";
$result = $conn->query($sql);
$data = [];
while($row = $result->fetch_assoc()) { $data[] = $row; }
echo json_encode($data);
$conn->close();
?>