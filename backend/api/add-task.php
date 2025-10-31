<?php


header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


require_once "../connection.php";

try{
    $data = json_decode(file_get_contents("php://input"),true);

    if(empty($data["user_id"])|| empty($data["title"])|| empty($data["description"])){
         echo json_encode(["status" => "error","message" => "Please Fill All The Fields!"]);
        exit;
    }

    
            $query = "INSERT INTO tasks (user_id,title,description) VALUES(:user_id, :title, :description)";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(":user_id",$data["user_id"]);
            $stmt->bindParam(":title",$data["title"]);
            $stmt->bindParam(":description",$data["description"]);

            $stmt->execute();
             http_response_code(201);
             echo json_encode(["status" => "success","message" => "Task Created Successfully!"]);
             exit;
    }
  

           
            
catch (PDOException $e){
    http_response_code(500);
    echo json_encode(["status" => "error","message" => "database error: ". $e->getMessage()]);
    exit;
}