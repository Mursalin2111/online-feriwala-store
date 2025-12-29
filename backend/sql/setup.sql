-- Create database
CREATE DATABASE IF NOT EXISTS online_feriwala;
USE online_feriwala;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    stock INT DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create cart table
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20),
    customer_address TEXT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert default categories
INSERT INTO categories (name) VALUES 
    ('All'),
    ('Food'),
    ('Crafts'),
    ('Fashion')
ON DUPLICATE KEY UPDATE name = name;

-- Insert sample products (prices in BDT)
INSERT INTO products (name, price, image, category, description) VALUES 
    ('Handwoven Basket', 4599.00, 'https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?w=400&h=400&fit=crop', 'Crafts', 'Beautiful handwoven basket made with natural materials'),
    ('Organic Honey Jar', 1850.00, 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop', 'Food', 'Pure organic honey from local beekeepers'),
    ('Artisan Ceramic Vase', 6500.00, 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop', 'Crafts', 'Handcrafted ceramic vase with unique patterns'),
    ('Spice Collection Box', 3299.00, 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop', 'Food', 'Curated collection of exotic spices'),
    ('Leather Satchel Bag', 8900.00, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', 'Fashion', 'Genuine leather handmade satchel bag'),
    ('Embroidered Scarf', 3500.00, 'https://images.unsplash.com/photo-1601924921557-45e6dea0a157?w=400&h=400&fit=crop', 'Fashion', 'Hand-embroidered silk scarf with traditional patterns'),
    ('Fresh Olive Oil', 2499.00, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop', 'Food', 'Extra virgin olive oil from Mediterranean farms'),
    ('Wooden Chess Set', 7500.00, 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=400&h=400&fit=crop', 'Crafts', 'Hand-carved wooden chess set with storage box');
