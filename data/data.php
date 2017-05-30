<?php


require_once('db.php');

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database;charset=utf8", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //$sql = "SELECT ID, FIRST_NAME, LAST_NAME, PHONE, EMAIL, TITLE FROM PEOPLE";
    $sql = "SELECT * FROM ko_person.PEOPLE";
    $result = $conn->query($sql);

    $people = [];

    while($row = $result->fetchObject()){
      array_push($people,$row);
    }

    echo json_encode($people);

    //$conn->close();
}catch(PDOException $e){
    //echo "Connection failed: " . $e->getMessage();
    echo '{"error":"true","message":"Something went wrong retrieving the data"}';
}
