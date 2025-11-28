<?php

require("connection.php");

$result = $conn->query("SELECT * FROM products");

$products = [];

$p = $result->fetch_assoc();

while ($p != null) {
    $products[] = $p;
    $p = $result->fetch_assoc();
}

echo json_encode($products);
