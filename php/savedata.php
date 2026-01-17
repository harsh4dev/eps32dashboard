<?php
include 'config.php';

if(isset($_POST['power'])) {
    $p = $_POST['power'];
    $v = $_POST['voltage'];
    $c = $_POST['current'];
    $t = $_POST['temp'];
    $h = $_POST['humidity'];
    $l = $_POST['light'];

    $sql = "INSERT INTO solar_logs (power, voltage, current, temp, humidity, light) 
            VALUES ('$p', '$v', '$c', '$t', '$h', '$l')";
    
    if ($conn->query($sql) === TRUE) { echo "OK"; }
}
?>