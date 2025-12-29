<?php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getCategories($db);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        break;
}

function getCategories($db)
{
    try {
        $query = "SELECT * FROM categories ORDER BY id ASC";
        $stmt = $db->prepare($query);
        $stmt->execute();

        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return just the names as an array
        $categoryNames = array_map(function ($cat) {
            return $cat['name'];
        }, $categories);

        echo json_encode($categoryNames);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}
