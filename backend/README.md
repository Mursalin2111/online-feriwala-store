# Online Feriwala - Backend Setup Guide

## Prerequisites
1. **XAMPP** or **WAMP** or **Laragon** installed
2. **MySQL** server running
3. **PHP 7.4+** with PDO extension

## Setup Instructions

### Step 1: Start Apache and MySQL
1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** services

### Step 2: Copy Backend Files
Copy the `backend` folder to your web server's root directory:
- **XAMPP**: `C:\xampp\htdocs\online-feriwala-store\backend`
- **WAMP**: `C:\wamp64\www\online-feriwala-store\backend`
- **Laragon**: `C:\laragon\www\online-feriwala-store\backend`

### Step 3: Create Database
1. Open **phpMyAdmin**: http://localhost/phpmyadmin
2. Click on **"Import"** tab
3. Choose the file: `backend/sql/setup.sql`
4. Click **"Go"** to execute

Or run in MySQL command line:
```sql
source C:/xampp/htdocs/online-feriwala-store/backend/sql/setup.sql
```

### Step 4: Update Database Configuration (if needed)
Edit `backend/config/database.php` if your MySQL credentials are different:
```php
private $host = "localhost";
private $database_name = "online_feriwala";
private $username = "root";        // Change if different
private $password = "";            // Add password if set
```

### Step 5: Update Frontend API URL
Edit `src/services/api.ts` to match your server URL:
```typescript
const API_BASE_URL = 'http://localhost/online-feriwala-store/backend/api';
```

## API Endpoints

### Products
- `GET /api/products.php` - Get all products
- `GET /api/products.php?id=1` - Get single product
- `GET /api/products.php?category=Food` - Get products by category
- `POST /api/products.php` - Create new product
- `PUT /api/products.php` - Update product
- `DELETE /api/products.php?id=1` - Delete product

### Cart
- `GET /api/cart.php` - Get cart items
- `POST /api/cart.php` - Add item to cart
- `PUT /api/cart.php` - Update cart item quantity
- `DELETE /api/cart.php?id=1` - Remove item from cart
- `DELETE /api/cart.php?clear=true` - Clear entire cart

### Orders
- `GET /api/orders.php` - Get all orders
- `GET /api/orders.php?id=1` - Get single order
- `POST /api/orders.php` - Create new order

### Categories
- `GET /api/categories.php` - Get all categories

## Database Tables
- `products` - Product catalog
- `categories` - Product categories
- `cart` - Shopping cart items
- `orders` - Customer orders
- `order_items` - Order line items

## Testing the API
Test endpoints in browser:
- http://localhost/online-feriwala-store/backend/api/products.php
- http://localhost/online-feriwala-store/backend/api/categories.php

## Troubleshooting

### CORS Errors
The API includes CORS headers. If you still get errors, ensure Apache's mod_headers is enabled.

### Database Connection Failed
1. Check if MySQL is running
2. Verify database credentials in `config/database.php`
3. Make sure the database `online_feriwala` exists

### 404 Not Found
1. Ensure the files are in the correct directory
2. Check if Apache is running
3. Verify the URL path matches your folder structure
