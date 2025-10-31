<?php


header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


require_once "../connection.php";

try{
    $data = json_decode(file_get_contents("php://input"),true);

    if(empty($data["username"])|| empty($data["email"])|| empty($data["password"])|| empty($data["confirmPassword"])){
         echo json_encode(["status" => "error","message" => "Please Fill All The Fields!"]);
        exit;
    }

     if($data["password"] !== $data["confirmPassword"]){
         echo json_encode(["status" => "error","message" => "Password do not match!"]);
        exit;
     }
     if (!filter_var($data["email"],FILTER_VALIDATE_EMAIL)){
         echo json_encode(["status" => "error","message" => "Please Enter Valid email!"]);
        exit;
    }
     //Check Query
           $checkQuery = "SELECT COUNT(*) FROM users WHERE email = :email";
           $checkStmt = $pdo->prepare($checkQuery);
           $checkStmt->bindParam(":email",$data["email"]);
           $checkStmt->execute();

            $email_count = $checkStmt->fetchColumn();

            
             if($email_count > 0){
                echo json_encode(["status" => "error","message" => "Email Already exists!"]);
                exit;
             }
           //Check Query
            $hashedPassword =  password_hash($data["password"],PASSWORD_BCRYPT,["cost" => 12]);

            $query = "INSERT INTO users (username,email,pwd) VALUES(:username, :email, :pwd)";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(":username",$data["username"]);
            $stmt->bindParam(":email",$data["email"]);
            $stmt->bindParam(":pwd",$hashedPassword);

            $stmt->execute();
             http_response_code(201);
             echo json_encode(["status" => "success","message" => "User Created Successfully!"]);
             exit;
           
            
}catch (PDOException $e){
    http_response_code(500);
    echo json_encode(["status" => "error","message" => "database error: ". $e->getMessage()]);
    exit;
}