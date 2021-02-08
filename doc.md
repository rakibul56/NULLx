#Table structure for Product_db database
@Products table

CREATE TABLE products(
   product_id INT AUTO_INCREMENT PRIMARY KEY, 
   quantity INT,
   product_name VARCHAR(40),
   price float,
   product_image VARCHAR(255)
);

INSERT INTO `products`(`product_name`, `price`, `quantity`, `product_image`) VALUES ('Rolleiflex 2.8f', '150', '3', 'product2.jpg');

