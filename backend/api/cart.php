<?php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

// Get session ID from header or generate one
$sessionId = isset($_SERVER['HTTP_X_SESSION_ID']) ? $_SERVER['HTTP_X_SESSION_ID'] : session_id();
if (empty($sessionId)) {
    session_start();
    $sessionId = session_id();
}

switch ($method) {
    case 'GET':
        getCart($db, $sessionId);
        break;
    
    case 'POST':
        addToCart($db, $sessionId);
        break;
    
    case 'PUT':
        updateCartItem($db, $sessionId);
        break;
    
    case 'DELETE':
        if (isset($_GET['id'])) {
            removeFromCart($db, $sessionId, $_GET['id']);
        } else if (isset($_GET['clear']) && $_GET['clear'] === 'true') {
            clearCart($db, $sessionId);
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        break;
}

function getCart($db, $sessionId) {
    try {
        $query = "SELECT c.id as cart_id, c.quantity, p.* 
                  FROM cart c 
                  JOIN products p ON c.product_id = p.id 
                  WHERE c.session_id = :session_id";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':session_id', $sessionId);
        $stmt->execute();
        
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $cart = [];
        $totalPrice = 0;
        $totalItems = 0;
        
        foreach ($items as $item) {
            $cartItem = [
                'id' => intval($item['id']),
                'cart_id' => intval($item['cart_id']),
                'name' => $item['name'],
                'price' => floatval($item['price']),
                'image' => $item['image'],
                'category' => $item['category'],
                'description' => $item['description'],
                'quantity' => intval($item['quantity'])
            ];
            $cart[] = $cartItem;
            $totalPrice += $cartItem['price'] * $cartItem['quantity'];
            $totalItems += $cartItem['quantity'];
        }
        
        echo json_encode([
            'items' => $cart,
            'totalPrice' => $totalPrice,
            'totalItems' => $totalItems,
            'sessionId' => $sessionId
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function addToCart($db, $sessionId) {
    try {
        $data = json_decode(file_get_contents("php://input"), true);
        $productId = $data['product_id'];
        $quantity = isset($data['quantity']) ? $data['quantity'] : 1;
        
        // Check if item already exists in cart
        $checkQuery = "SELECT * FROM cart WHERE session_id = :session_id AND product_id = :product_id";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->bindParam(':session_id', $sessionId);
        $checkStmt->bindParam(':product_id', $productId);
        $checkStmt->execute();
        
        $existing = $checkStmt->fetch(PDO::FETCH_ASSOC);
        
        if ($existing) {
            // Update quantity
            $newQuantity = $existing['quantity'] + $quantity;
            $updateQuery = "UPDATE cart SET quantity = :quantity WHERE id = :id";
            $updateStmt = $db->prepare($updateQuery);
            $updateStmt->bindParam(':quantity', $newQuantity);
            $updateStmt->bindParam(':id', $existing['id']);
            $updateStmt->execute();
        } else {
            // Insert new item
            $insertQuery = "INSERT INTO cart (session_id, product_id, quantity) VALUES (:session_id, :product_id, :quantity)";
            $insertStmt = $db->prepare($insertQuery);
            $insertStmt->bindParam(':session_id', $sessionId);
            $insertStmt->bindParam(':product_id', $productId);
            $insertStmt->bindParam(':quantity', $quantity);
            $insertStmt->execute();
        }
        
        echo json_encode([
            "message" => "Item added to cart",
            "sessionId" => $sessionId
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function updateCartItem($db, $sessionId) {
    try {
        $data = json_decode(file_get_contents("php://input"), true);
        $productId = $data['product_id'];
        $quantity = $data['quantity'];
        
        if ($quantity <= 0) {
            // Remove item if quantity is 0 or less
            removeFromCart($db, $sessionId, $productId);
            return;
        }
        
        $query = "UPDATE cart SET quantity = :quantity 
                  WHERE session_id = :session_id AND product_id = :product_id";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':quantity', $quantity);
        $stmt->bindParam(':session_id', $sessionId);
        $stmt->bindParam(':product_id', $productId);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Cart updated successfully"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function removeFromCart($db, $sessionId, $productId) {
    try {
        $query = "DELETE FROM cart WHERE session_id = :session_id AND product_id = :product_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':session_id', $sessionId);
        $stmt->bindParam(':product_id', $productId);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Item removed from cart"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function clearCart($db, $sessionId) {
    try {
        $query = "DELETE FROM cart WHERE session_id = :session_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':session_id', $sessionId);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Cart cleared successfully"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}
?>
