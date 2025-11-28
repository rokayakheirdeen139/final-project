<?php

require("connection.php");

$product_id = $_POST["product_id"];
$quantity = $_POST["quantity"];

$result = $conn->query("SELECT price FROM products WHERE id = $product_id");
$product = $result->fetch_assoc();

if ($product == null) {
    $response = [
        "message" => "Product not found"
    ];
} else {
    $price = $product["price"];
    $total_price = $price * $quantity;

    
    $conn->query("INSERT INTO orders (product_id, quantity, total_price)
                  VALUES ($product_id, $quantity, $total_price)");

    $response = [
        "message" => "Order created",
        "total_price" => $total_price
    ];
}

echo json_encode($response);
