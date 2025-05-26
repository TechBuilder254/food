-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2025 at 07:10 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`, `name`, `created_at`, `last_login`) VALUES
(3, 'admin@gmail.com', '$2b$10$c7oLPXMmpLGEHgOLweOBhOGf08iE/OlFa9a2aV.h5mWdTUITR0T26', 'admin', '2025-05-25 22:07:12', '2025-05-26 04:48:06');

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_items`
--

INSERT INTO `menu_items` (`id`, `name`, `description`, `price`, `category`, `image_url`, `created_at`) VALUES
(1, 'Burger', 'Delicious beef burger with fresh toppings', 500.99, 'Fast Foods', '/images/burger-frenchfries.png', '2025-05-26 00:36:43'),
(2, 'French Fries', 'Crispy golden french fries', 200.99, 'Fast Foods', '/images/R.jpg', '2025-05-26 00:36:43'),
(3, 'Broccoli', 'Fresh and healthy broccoli', 124.99, 'Vegetables', '/images/B.jpg', '2025-05-26 00:36:43'),
(4, 'Beef Steak 1kg', 'Premium cut beef steak', 1500.99, 'Meats', '/images/beef.jpg', '2025-05-26 00:36:43'),
(5, 'Chocolate Cake', 'Rich and decadent chocolate cake', 400.99, 'Sweets', '/images/cake.jpg', '2025-05-26 00:36:43');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `status` enum('pending','confirmed','preparing','delivered','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_name`, `customer_email`, `customer_phone`, `address`, `total_amount`, `payment_method`, `status`, `created_at`, `user_id`) VALUES
(9, 'Alexander kamande', 'alexanderkamande@zetech.ac.ke', '0700021601', 'Zetech University', 701.98, 'mpesa', 'pending', '2025-05-25 23:45:47', NULL),
(10, 'Alexander kamande', 'alexanderkamande@zetech.ac.ke', '0700021601', 'Zetech University', 500.99, 'mpesa', 'delivered', '2025-05-25 23:55:26', NULL),
(12, 'james kamau', 'james@gmail.com', '0773052507', 'Zetech University', 500.99, 'mpesa', 'delivered', '2025-05-26 00:01:35', NULL),
(15, 'Alexander kamande', 'aleqekamaa254@gmail.com', '0773052507', 'Zetech University', 500.99, 'mpesa', 'pending', '2025-05-26 00:22:14', NULL),
(16, 'Alexander kamande', 'aleqekamaa254@gmail.com', '0773052507', 'Zetech University', 200.99, 'mpesa', 'pending', '2025-05-26 00:27:03', NULL),
(17, 'Alexander kamande', 'aleqekamaa254@gmail.com', '0773052507', 'Zetech University', 1500.99, 'mpesa', 'pending', '2025-05-26 00:36:52', NULL),
(18, 'Alexander kamande', 'alexanderkamande@zetech.ac.ke', '0700021601', 'Zetech University', 400.99, 'mpesa', 'pending', '2025-05-26 00:37:18', NULL),
(19, 'Alexander kamande', 'alexanderkamande@zetech.ac.ke', '0700021601', 'Zetech University', 500.99, 'mpesa', 'pending', '2025-05-26 01:21:09', NULL),
(20, 'Alexander kamande', 'alexanderkamande@zetech.ac.ke', '0700021601', 'Zetech University', 500.99, 'mpesa', 'pending', '2025-05-26 04:22:26', NULL),
(21, 'Alexander kamande', 'alexanderkamande@zetech.ac.ke', '0700021601', 'Zetech University', 500.99, 'mpesa', 'pending', '2025-05-26 04:34:15', NULL),
(22, 'Alexander kamande', 'alexanderkamande@zetech.ac.ke', '0700021601', 'Zetech University', 1500.99, 'mpesa', 'pending', '2025-05-26 04:34:27', NULL),
(23, 'Alexander kamande', 'alexanderkamande@zetech.ac.ke', '0700021601', 'Zetech University', 500.99, 'mpesa', 'delivered', '2025-05-26 04:46:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `menu_item_id`, `quantity`, `price`, `created_at`, `product_id`) VALUES
(1, 17, 4, 1, 1500.99, '2025-05-26 00:36:52', 0),
(2, 18, 5, 1, 400.99, '2025-05-26 00:37:18', 0),
(3, 19, 1, 1, 500.99, '2025-05-26 01:21:09', 0),
(4, 20, 1, 1, 500.99, '2025-05-26 04:22:26', 0),
(5, 21, 1, 1, 500.99, '2025-05-26 04:34:15', 0),
(6, 22, 4, 1, 1500.99, '2025-05-26 04:34:27', 0),
(7, 23, 1, 1, 500.99, '2025-05-26 04:46:53', 0);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `category`, `price`, `description`) VALUES
(1, 'Burger', '/images/burger.png', NULL, 5.99, 'Delicious beef burger'),
(2, 'Fries', '/images/fries.png', NULL, 2.99, 'Crispy french fries');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_users` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_items_orders` (`order_id`),
  ADD KEY `fk_order_items_menu_items` (`menu_item_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items_menu_items` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`),
  ADD CONSTRAINT `fk_order_items_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
