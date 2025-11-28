<?php

require("connection.php");

$product_id = $_GET["product_id"];

$result = $conn->query("
    SELECT * FROM orders 
    WHERE product_id = $product_id
    ORDER BY created_at DESC
    LIMIT 10
");

$orders = [];

$o = $result->fetch_assoc();

while ($o != null) {
    $orders[] = $o;
    $o = $result->fetch_assoc();
}

echo json_encode($orders);
