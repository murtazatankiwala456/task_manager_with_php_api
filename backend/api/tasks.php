<?php


header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");


require_once "../connection.php";

try{
     if ($_SERVER["REQUEST_METHOD"] !== "GET") {
        http_response_code(405);
        echo json_encode(["status" => false, "message" => "Only GET method is allowed"]);
        exit;
    }
//fetching single record for edit 
    if (isset($_GET["task_id"])) {
        $task_id = $_GET["task_id"];

        $query = "SELECT 
                    task_id,
                    title,
                    description,
                    DATE_FORMAT(created_at, '%D %M %Y') AS 'created_at'
                  FROM tasks
                  WHERE task_id = :task_id";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":task_id", $task_id, PDO::PARAM_INT);
        $stmt->execute();

        $task = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($task) {
            http_response_code(200);
            echo json_encode(["status" => "success", "task" => $task]);
            exit;
        } else {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Task not found"]);
              exit;
        }
          exit;
      
        //fetching single record for edit 
    }
       $user_id = $_GET["user_id"];
      $query = "SELECT 
              task_id ,
              title,
              description,
              DATE_FORMAT(created_at, '%D %M %Y') AS 'created_at'
             FROM tasks
             WHERE user_id = :user_id";
            $stmt = $pdo->prepare($query);


            

            $stmt->bindParam(":user_id",$user_id, PDO::PARAM_INT);
          
           

            $stmt->execute();

            $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
             http_response_code(200);
               echo json_encode([
        "status" => "success",
        "message" => count($tasks) > 0 ? "Tasks fetched successfully" : "No tasks found",
        "tasks" => $tasks
             ]);
           exit;
            
}catch (PDOException $e){
    http_response_code(500);
    echo json_encode(["status" => "error","message" => "database error: ". $e->getMessage()]);
    exit;
}