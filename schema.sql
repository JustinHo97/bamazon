DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("Small Rocks", "Landscaping", 29.99, 15),
("Gaming Mouse", "Electronics", 59.99, 10),
("A Large Couch", "Furniture", 249.95, 1),
("A Tree", "Landscaping", 99.99, 100),
("A Stool", "Furniture", 36.99, 7);
