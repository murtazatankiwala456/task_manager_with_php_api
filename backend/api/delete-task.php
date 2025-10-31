<?php


header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");


require_once "../connection.php";

try{
    $data = json_decode(file_get_contents("php://input"),true);

   

    
          
            $query = "DELETE FROM tasks WHERE task_id = :task_id";
            $stmt = $pdo->prepare($query);


         

            $stmt->bindParam(":task_id",$data["task_id"]);
           

            $stmt->execute();
              http_response_code(200);
            echo json_encode(["status" => "success", "message" => "Task deleted successfully"]);

    }
  

           
            
catch (PDOException $e){
    http_response_code(500);
    echo json_encode(["status" => "error","message" => "database error: ". $e->getMessage()]);
    exit;
}