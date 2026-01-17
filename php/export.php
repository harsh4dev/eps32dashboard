<?php
include 'config.php';
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename=Solar_Report_'.date('Y-m-d').'.csv');

$output = fopen('php://output', 'w');
fputcsv($output, array('ID', 'Power', 'Voltage', 'Current', 'Temp', 'Humidity', 'Light', 'Time'));

$res = mysqli_query($conn, "SELECT * FROM solar_logs ORDER BY id DESC");
while($row = mysqli_fetch_assoc($res)) { fputcsv($output, $row); }
fclose($output);
?>