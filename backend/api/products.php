<?php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all products or single product
        if (isset($_GET['id'])) {
            getProduct($db, $_GET['id']);
        } else if (isset($_GET['category']) && $_GET['category'] !== 'All') {
            getProductsByCategory($db, $_GET['category']);
        } else {
            getAllProducts($db);
        }
        break;

    case 'POST':
        // Add new product
        addProduct($db);
        break;

    case 'PUT':
        // Update product
        updateProduct($db);
        break;

    case 'DELETE':
        // Delete product
        if (isset($_GET['id'])) {
            deleteProduct($db, $_GET['id']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        break;
}

function getAllProducts($db)
{
    try {
        $query = "SELECT * FROM products ORDER BY created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Convert price to float for JSON
        foreach ($products as &$product) {
            $product['price'] = floatval($product['price']);
            $product['id'] = intval($product['id']);
            $product['stock'] = intval($product['stock']);
        }

        echo json_encode($products);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function getProduct($db, $id)
{
    try {
        $query = "SELECT * FROM products WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($product) {
            $product['price'] = floatval($product['price']);
            $product['id'] = intval($product['id']);
            $product['stock'] = intval($product['stock']);
            echo json_encode($product);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Product not found"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function getProductsByCategory($db, $category)
{
    try {
        $query = "SELECT * FROM products WHERE category = :category ORDER BY created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':category', $category);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($products as &$product) {
            $product['price'] = floatval($product['price']);
            $product['id'] = intval($product['id']);
            $product['stock'] = intval($product['stock']);
        }

        echo json_encode($products);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function addProduct($db)
{
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        $query = "INSERT INTO products (name, price, image, category, description, stock) 
                  VALUES (:name, :price, :image, :category, :description, :stock)";

        $stmt = $db->prepare($query);
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':price', $data['price']);
        $stmt->bindParam(':image', $data['image']);
        $stmt->bindParam(':category', $data['category']);
        $stmt->bindParam(':description', $data['description']);
        $stock = isset($data['stock']) ? $data['stock'] : 100;
        $stmt->bindParam(':stock', $stock);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                "message" => "Product created successfully",
                "id" => $db->lastInsertId()
            ]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function updateProduct($db)
{
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        $query = "UPDATE products SET 
                  name = :name, 
                  price = :price, 
                  image = :image, 
                  category = :category, 
                  description = :description,
                  stock = :stock
                  WHERE id = :id";

        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $data['id']);
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':price', $data['price']);
        $stmt->bindParam(':image', $data['image']);
        $stmt->bindParam(':category', $data['category']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':stock', $data['stock']);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Product updated successfully"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function deleteProduct($db, $id)
{
    try {
        $query = "DELETE FROM products WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Product deleted successfully"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}
