<?php
$dsn = "mysql:host=localhost;dbname=task_manager_with_api";
$dbusername = "root";
$dbpassword = "";

try{

$pdo = new PDO($dsn,$dbusername,$dbpassword);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}catch(PDOException $e){

   http_response_code(500);

  echo json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . $e->getMessage()
    ]);
    exit;
}