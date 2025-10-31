<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


require_once "../connection.php";

try{
    $data = json_decode(file_get_contents("php://input"),true);

    if( empty($data["email"])|| empty($data["password"])){
         http_response_code(401);
         echo json_encode(["status" => "error","message" => "Please Fill All The Fields!"]);
        exit;
    }

     if (!filter_var($data["email"],FILTER_VALIDATE_EMAIL)){
         http_response_code(401);
         echo json_encode(["status" => "error","message" => "Please Enter Valid email!"]);
        exit;
    }
    
    $query = "SELECT * FROM users WHERE email = :email";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":email", $data["email"]);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check user existence
    if (!$user) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "No user found with this email!"]);
        exit;
    }
           
    if (password_verify($data["password"], $user["pwd"])) {
        // success
        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "message" => "Login successful!",
            "user" => [
                "id" => $user["user_id"],
                "username" => $user["username"],
                "email" => $user["email"]
            ]
        ]);
    } else {
         http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Invalid password!"]);
    }
            
}catch (PDOException $e){
    http_response_code(500);
    echo json_encode(["status" => "error","message" => "database error: ". $e->getMessage()]);
    exit;
}