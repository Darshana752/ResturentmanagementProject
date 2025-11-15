-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2025 at 06:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project3`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `user_id` int(11) NOT NULL,
  `post` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`user_id`, `post`) VALUES
(6, 'manager'),
(8, NULL),
(9, NULL),
(11, 'wife'),
(12, 'wife2'),
(14, 'rider'),
(17, 'driver'),
(20, 'sdf'),
(27, 'manager2');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `user_id` int(11) NOT NULL,
  `home_no` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`user_id`, `home_no`, `street`, `city`) VALUES
(4, '12/A', 'Main Street', 'Kandy'),
(5, '12/A', 'Main Street', 'Kandy'),
(7, 'dzbb', 'dsc', 'sc'),
(13, 'dzbb', 'dsc', 'sc'),
(15, 'dzbb', 'dsc', 'sc'),
(18, '12', 'ritiketiya', 'meegama'),
(19, 'gk', 'kfm', 'cm'),
(22, 'h', 'sb', 'sbb'),
(29, '0741304544', 'Welikade', 'Thalaramba');

-- --------------------------------------------------------

--
-- Table structure for table `deliver`
--

CREATE TABLE `deliver` (
  `delivery_id` bigint(20) NOT NULL,
  `delivery_person` varchar(255) NOT NULL,
  `contact_no` varchar(255) DEFAULT NULL,
  `vehicle_no` varchar(255) DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deliver`
--

INSERT INTO `deliver` (`delivery_id`, `delivery_person`, `contact_no`, `vehicle_no`, `order_id`, `user_id`) VALUES
(1, 'John Doe', '0779876543', 'WP 1234', 20, 22),
(2, 'fdjdfj', '01234', '12354', 20, 22),
(3, 'duel', '07569459', '123-4569', 21, 22),
(4, 'bimmal', '01236598', '2569', 22, 29);

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `food_id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `ingredient` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`food_id`, `name`, `price`, `image`, `category`, `ingredient`, `description`) VALUES
(3, 'carr', 456, 'c183fff2-2b22-4bf2-9e9b-fd76ec3184c2_image1.jpg', 'nbcvn', 'vncng', 'cjjjgcnzd'),
(4, 'dsvnljkn', 569, '760fa78b-866a-4641-bccd-4d92fd888a0d_image2.jpg', 'dvvb', 'dbfbdh', 'sdb');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `delivery_address` varchar(255) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `amount` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `delivery_address`, `date`, `status`, `amount`) VALUES
(20, 22, 'dfnfg', '2025-11-10 22:50:05.000000', 'Delivered', 569),
(21, 22, 'wijerama,maharagama', '2025-11-11 11:20:53.000000', 'Delivered', 569),
(22, 29, 'Wijerams', '2025-11-11 11:39:00.000000', 'Delivered', 1138);

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `order_item_id` bigint(20) NOT NULL,
  `order_id` int(11) NOT NULL,
  `food_id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price_at_purchase` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`order_item_id`, `order_id`, `food_id`, `quantity`, `price_at_purchase`) VALUES
(18, 20, 4, 1, 569),
(19, 21, 4, 1, 569),
(20, 22, 4, 2, 569);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `phone`, `role`) VALUES
(1, 'Malith', 'malith@gmail.com', '1234', '0712345678', NULL),
(4, 'Malith', 'malith88@gmail.com', '12345', '0771234567', NULL),
(5, 'darshana', 'malith8@gmail.com', '12345', '0771234567', 'customer'),
(6, 'Malithdgg', 'malith5@gmail.com', '12345', '0771234567', 'admin'),
(7, 'gdjsg', 'as2022572@sci.sjp.ac.lk', '123456', '0761340203', 'CUSTOMER'),
(8, 'dsv', 'xbcb@gmail.com', 'dvs', '07684569', 'ADMIN'),
(9, 'kdsfbj', 'malithdarshana2000@gmail.com', 'dsvdv', NULL, NULL),
(11, 'sahana', 'malt@gmail.com', '4569sdsa', '0761340203', NULL),
(12, 'prahd', 'kmtsanjaya2002@gmail.com', '466as597', '0761340203', 'ADMIN'),
(13, 'dnbf', 'as2022fb572@sci.sjp.ac.lk', 'sfjsdghsjh', '0761340203', 'CUSTOMER'),
(14, 'duel ransara', 'ggff@gmail.com', 'gjsdh454', '021465792243', 'ADMIN'),
(15, 'hirusha', 'as20225742@sci.sjp.ac.lk', 'gasdk56', '0761340203', 'CUSTOMER'),
(17, 'nkjnv', 'kmtsanjaya200d2@gmail.com', 'dsuhv', '0761340203', 'ADMIN'),
(18, 'malith', 'malith99@gmail.com', 'Darshana9@', '0768446989', 'CUSTOMER'),
(19, 'nsdhbsvhb', 'as202@gmail.com', 'gasgaggdga', '01235445243', 'CUSTOMER'),
(20, 'siyatha', 'siya@gmail.com', '123456', '012345678', 'ADMIN'),
(22, 'malith darshana', 'malith9@gmail.com', 'Darshana9@', '0768446989', 'CUSTOMER'),
(27, 'darshanavdsj', 'as2022572@gmail.com', 'Darshana9@', '0768446989', 'ADMIN'),
(29, 'Ransara', 'ransarakularathna2@gmail.com', 'Kule2000', '0741304544', 'CUSTOMER');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `deliver`
--
ALTER TABLE `deliver`
  ADD PRIMARY KEY (`delivery_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`food_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `food_id` (`food_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `deliver`
--
ALTER TABLE `deliver`
  MODIFY `delivery_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `food_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `order_item_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `deliver`
--
ALTER TABLE `deliver`
  ADD CONSTRAINT `deliver_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `deliver_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `customer` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `customer` (`user_id`);

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
