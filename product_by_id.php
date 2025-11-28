<?php

require("connection.php");
header("Content-Type: application/json");

if (!isset($_GET["id"])) {
    echo json_encode(["message" => "id is required"]);
    exit;
}

$id = (int) $_GET["id"];

$query = $conn->prepare("SELECT * FROM products WHERE id = ?");
$query->bind_param("i", $id);
$query->execute();
$result = $query->get_result();

$product = $result->fetch_assoc();

if ($product == null) {
    $response = ["message" => "Product not found"];
} else {
    $response = $product;
}

echo json_encode($response);
