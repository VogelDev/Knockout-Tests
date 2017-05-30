<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
  require_once('db.php');
  $data = json_decode(file_get_contents("php://input"));
  try {
      $conn = new PDO("mysql:host=$servername;dbname=$database;charset=utf8", $username, $password);
      // set the PDO error mode to exception
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $sql = "";

      for($x = 0; $x <= 0; $x++){

        $id = $data[$x];

        $sql .= "DELETE FROM PEOPLE WHERE ID = $id";
      }
      $conn->query($sql);

  }catch(PDOException $e){
      //echo "Connection failed: " . $e->getMessage();
      echo '{"error":"true","message":"Something went wrong retrieving the data"}';
  }

}
