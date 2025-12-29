<?php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

$sessionId = isset($_SERVER['HTTP_X_SESSION_ID']) ? $_SERVER['HTTP_X_SESSION_ID'] : session_id();
if (empty($sessionId)) {
    session_start();
    $sessionId = session_id();
}

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            getOrder($db, $_GET['id']);
        } else {
            getOrders($db, $sessionId);
        }
        break;

    case 'POST':
        createOrder($db, $sessionId);
        break;

    case 'PUT':
        updateOrderStatus($db);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        break;
}

function getOrders($db, $sessionId)
{
    try {
        $query = "SELECT * FROM orders WHERE session_id = :session_id ORDER BY created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':session_id', $sessionId);
        $stmt->execute();

        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($orders as &$order) {
            $order['id'] = intval($order['id']);
            $order['total_amount'] = floatval($order['total_amount']);
        }

        echo json_encode($orders);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function getOrder($db, $orderId)
{
    try {
        // Get order details
        $orderQuery = "SELECT * FROM orders WHERE id = :id";
        $orderStmt = $db->prepare($orderQuery);
        $orderStmt->bindParam(':id', $orderId);
        $orderStmt->execute();

        $order = $orderStmt->fetch(PDO::FETCH_ASSOC);

        if (!$order) {
            http_response_code(404);
            echo json_encode(["error" => "Order not found"]);
            return;
        }

        // Get order items
        $itemsQuery = "SELECT oi.*, p.name, p.image, p.category 
                       FROM order_items oi 
                       JOIN products p ON oi.product_id = p.id 
                       WHERE oi.order_id = :order_id";
        $itemsStmt = $db->prepare($itemsQuery);
        $itemsStmt->bindParam(':order_id', $orderId);
        $itemsStmt->execute();

        $items = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);

        $order['id'] = intval($order['id']);
        $order['total_amount'] = floatval($order['total_amount']);
        $order['items'] = $items;

        echo json_encode($order);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function createOrder($db, $sessionId)
{
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        // Get cart items
        $cartQuery = "SELECT c.*, p.price FROM cart c 
                      JOIN products p ON c.product_id = p.id 
                      WHERE c.session_id = :session_id";
        $cartStmt = $db->prepare($cartQuery);
        $cartStmt->bindParam(':session_id', $sessionId);
        $cartStmt->execute();

        $cartItems = $cartStmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($cartItems)) {
            http_response_code(400);
            echo json_encode(["error" => "Cart is empty"]);
            return;
        }

        // Calculate total
        $totalAmount = 0;
        foreach ($cartItems as $item) {
            $totalAmount += floatval($item['price']) * intval($item['quantity']);
        }

        // Start transaction
        $db->beginTransaction();

        // Create order
        $orderQuery = "INSERT INTO orders (session_id, customer_name, customer_email, customer_phone, customer_address, total_amount) 
                       VALUES (:session_id, :name, :email, :phone, :address, :total)";
        $orderStmt = $db->prepare($orderQuery);
        $orderStmt->bindParam(':session_id', $sessionId);
        $orderStmt->bindParam(':name', $data['customer_name']);
        $orderStmt->bindParam(':email', $data['customer_email']);
        $orderStmt->bindParam(':phone', $data['customer_phone']);
        $orderStmt->bindParam(':address', $data['customer_address']);
        $orderStmt->bindParam(':total', $totalAmount);
        $orderStmt->execute();

        $orderId = $db->lastInsertId();

        // Add order items
        $itemQuery = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (:order_id, :product_id, :quantity, :price)";
        $itemStmt = $db->prepare($itemQuery);

        foreach ($cartItems as $item) {
            $itemStmt->bindParam(':order_id', $orderId);
            $itemStmt->bindParam(':product_id', $item['product_id']);
            $itemStmt->bindParam(':quantity', $item['quantity']);
            $itemStmt->bindParam(':price', $item['price']);
            $itemStmt->execute();
        }

        // Clear cart
        $clearQuery = "DELETE FROM cart WHERE session_id = :session_id";
        $clearStmt = $db->prepare($clearQuery);
        $clearStmt->bindParam(':session_id', $sessionId);
        $clearStmt->execute();

        $db->commit();

        http_response_code(201);
        echo json_encode([
            "message" => "Order placed successfully",
            "order_id" => $orderId,
            "total_amount" => $totalAmount
        ]);
    } catch (PDOException $e) {
        $db->rollBack();
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function updateOrderStatus($db)
{
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        $query = "UPDATE orders SET status = :status WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':status', $data['status']);
        $stmt->bindParam(':id', $data['id']);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Order status updated successfully"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}
