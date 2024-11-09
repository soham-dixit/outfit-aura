-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2024 at 09:10 AM
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
-- Database: `fashionkart`
--

-- --------------------------------------------------------

--
-- Table structure for table `browsing_history`
--

CREATE TABLE `browsing_history` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `occasion` varchar(100) DEFAULT NULL,
  `productUsage` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `browsing_history`
--

INSERT INTO `browsing_history` (`id`, `userId`, `productId`, `productName`, `brand`, `category`, `occasion`, `productUsage`, `color`, `price`, `rating`) VALUES
(73, 2, 10029, 'Nike Women As Script Mas Navy Blue Sweatshirts', 'Nike', 'Topwear', '', NULL, 'Navy Blue', 1995.00, 5.00),
(74, 2, 10003, 'Nike Women As Nike Eleme White T-Shirt', 'Nike', 'Topwear', '', NULL, 'White', 2695.00, 4.00),
(75, 2, 10003, 'Nike Women As Nike Eleme White T-Shirt', 'Nike', 'Topwear', '', NULL, 'White', 2695.00, 4.00),
(76, 2, 10080, 'Reebok Men Run Sheer Black Sports Shoes', 'Reebok', 'Footwear', '', NULL, 'Black', 3599.00, 4.00),
(77, 2, 10003, 'Nike Women As Nike Eleme White T-Shirt', 'Nike', 'Topwear', '', NULL, 'White', 2695.00, 4.00),
(78, 2, 10011, 'Nike Men Grey Melange Track Pants', 'Nike', 'Bottomwear', 'Sports', NULL, 'Grey Melange', 1495.00, 4.00),
(79, 2, 10003, 'Nike Women As Nike Eleme White T-Shirt', 'Nike', 'Topwear', '', NULL, 'White', 2695.00, 4.00),
(80, 2, 10011, 'Nike Men Grey Melange Track Pants', 'Nike', 'Bottomwear', 'Sports', NULL, 'Grey Melange', 1495.00, 4.00),
(81, 2, 10029, 'Nike Women As Script Mas Navy Blue Sweatshirts', 'Nike', 'Topwear', '', NULL, 'Navy Blue', 1995.00, 5.00);

-- --------------------------------------------------------

--
-- Table structure for table `cart_history`
--

CREATE TABLE `cart_history` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `cartDate` date DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `occasion` varchar(100) DEFAULT NULL,
  `productUsage` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `frequent_data`
--

CREATE TABLE `frequent_data` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `viewDate` date DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `occasion` varchar(100) DEFAULT NULL,
  `productUsage` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `frequent_data`
--

INSERT INTO `frequent_data` (`id`, `userId`, `productId`, `productName`, `viewDate`, `brand`, `category`, `occasion`, `productUsage`, `color`, `price`, `rating`) VALUES
(19, 2, 10029, 'Sweatshirts', '2024-10-22', 'Nike', 'Topwear', '', NULL, 'Navy Blue', 1995.00, 5.00),
(20, 2, 10032, 'Tshirts', '2024-10-22', 'Nike', 'Topwear', '', NULL, 'Black', 1195.00, 5.00),
(21, 2, 10185, 'Shirts', '2024-10-22', 'Indigo Nation', 'Topwear', '', NULL, 'White', 1049.00, 2.00),
(22, 2, 10011, 'Track Pants', '2024-10-22', 'Nike', 'Bottomwear', 'Sports', NULL, 'Grey Melange', 1495.00, 4.00),
(23, 2, 10080, 'Sports Shoes', '2024-10-22', 'Reebok', 'Footwear', '', NULL, 'Black', 3599.00, 4.00),
(24, 2, 10000, 'Skirts', '2024-10-22', 'Palm Tree', 'Bottomwear', '', NULL, 'White', 649.00, 2.00),
(25, 2, 10003, 'Tshirts', '2024-10-22', 'Nike', 'Topwear', '', NULL, 'White', 2695.00, 4.00),
(26, 2, 10011, 'Track Pants', '2024-10-22', 'Nike', 'Bottomwear', 'Sports', NULL, 'Grey Melange', 1495.00, 4.00),
(27, 2, 10029, 'Sweatshirts', '2024-10-22', 'Nike', 'Topwear', '', NULL, 'Navy Blue', 1995.00, 5.00),
(28, 2, 3221, 'Sports Shoes', '2024-10-22', 'Puma', 'Footwear', '', NULL, 'White', 2799.00, 4.00),
(29, 2, 33233, 'Shirts', '2024-10-22', 'Arrow', 'Topwear', 'Formal', NULL, 'White', 1499.00, 5.00);

-- --------------------------------------------------------

--
-- Table structure for table `generated_browsing_history`
--

CREATE TABLE `generated_browsing_history` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `generated_browsing_history`
--

INSERT INTO `generated_browsing_history` (`id`, `userId`, `imageUrl`) VALUES
(1, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmpvjyantm7.png?alt=media&token=2b5b9c97-6c31-49bf-bf88-bf20294223bf'),
(2, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmpn42x0mu5.png?alt=media&token=ddd925a1-75a3-49b3-a957-281a7830b3ab'),
(3, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmpz5o02udk.png?alt=media&token=9f0136ad-db23-40ec-818b-05642f37d4ad'),
(4, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmp1rigjvcr.png?alt=media&token=6e7803b6-bf51-4d2b-b367-176398bc4fba'),
(5, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmpn42x0mu5.png?alt=media&token=ddd925a1-75a3-49b3-a957-281a7830b3ab');

-- --------------------------------------------------------

--
-- Table structure for table `generated_cart_history`
--

CREATE TABLE `generated_cart_history` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `generated_cart_history`
--

INSERT INTO `generated_cart_history` (`id`, `userId`, `imageUrl`) VALUES
(1, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmpbwz51aj5.png?alt=media&token=7d786f47-4e87-4949-b995-c24478350556'),
(2, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmpg8507y38.png?alt=media&token=0c8f0dab-e181-4c83-842e-6687609b2b44'),
(3, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmpjyqdtyfk.png?alt=media&token=2e328352-d174-4e5c-ac5b-12d6dce4483e'),
(4, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmp5rholfrf.png?alt=media&token=c0ed32e8-35fb-4403-86e9-d35c8e4a1691'),
(5, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmpkzh772s8.png?alt=media&token=5ef5230c-c358-4f98-87e5-2dcd554eb103');

-- --------------------------------------------------------

--
-- Table structure for table `generated_frequent_data`
--

CREATE TABLE `generated_frequent_data` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `generated_frequent_data`
--

INSERT INTO `generated_frequent_data` (`id`, `userId`, `imageUrl`) VALUES
(37, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2F05dee24a-d120-4d37-a544-136a0d33a8c4.jpeg?alt=media&token=4a5d8ceb-fb86-4fb8-b0d6-0614e82bf8ad'),
(38, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Fbbd68f14-58f4-4c46-b9e6-e6297552f380.jpeg?alt=media&token=6d5d7385-1d02-4feb-b94c-c9b7e2a8c208'),
(39, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Fed10b8cf-a96a-416f-a461-14bfb6fc1edf.jpeg?alt=media&token=6a0a9a78-35ce-4ae0-9337-99029362f917'),
(40, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Fimg-XVFHMROIV5iHOHHg51puNMIL.png?alt=media&token=b941eedb-0b08-4613-9293-63310b88a6ca'),
(41, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmp0t5wkfy4.png?alt=media&token=63a8645b-c904-474d-9ae4-db2b4e09b045');

-- --------------------------------------------------------

--
-- Table structure for table `generated_purchasing_history`
--

CREATE TABLE `generated_purchasing_history` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `generated_purchasing_history`
--

INSERT INTO `generated_purchasing_history` (`id`, `userId`, `imageUrl`) VALUES
(1, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmpp_45l2_r.png?alt=media&token=0ad0647b-d543-4648-a263-02c6cad50e9d'),
(2, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmpouxp01n5.png?alt=media&token=19d7a836-1d4c-4217-ab16-4767d4b46bdf'),
(3, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmp22qcyvjw.png?alt=media&token=65d3a7a2-33ea-462e-8b21-ecbe7fe1a3e1'),
(4, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmper6qb9gx.png?alt=media&token=80697537-8880-4e3e-b559-8355bc1bff42'),
(5, 2, 'https://firebasestorage.googleapis.com/v0/b/fashionkart-26db7.appspot.com/o/generatedImages%2Ftmpxhw1fv_2.png?alt=media&token=8e40ecef-636b-4743-84a2-4a59a4024948');

-- --------------------------------------------------------

--
-- Table structure for table `purchasing_history`
--

CREATE TABLE `purchasing_history` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `purchaseDate` date DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `occasion` varchar(100) DEFAULT NULL,
  `productUsage` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recommended_browsing_history`
--

CREATE TABLE `recommended_browsing_history` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `occasion` varchar(100) DEFAULT NULL,
  `productUsage` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recommended_cart_history`
--

CREATE TABLE `recommended_cart_history` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `cartDate` date DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `occasion` varchar(100) DEFAULT NULL,
  `productUsage` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recommended_frequent_data`
--

CREATE TABLE `recommended_frequent_data` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `viewDate` date DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `occasion` varchar(100) DEFAULT NULL,
  `productUsage` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recommended_frequent_data`
--

INSERT INTO `recommended_frequent_data` (`id`, `userId`, `productId`, `productName`, `viewDate`, `brand`, `category`, `occasion`, `productUsage`, `color`, `price`, `rating`) VALUES
(60, 2, 2026, 'Tshirts', '2024-10-22', 'ADIDAS', 'Topwear', '', NULL, 'Green', 1399.00, 2.00),
(61, 2, 33233, 'Shirts', '2024-10-22', 'Arrow', 'Topwear', 'Formal', NULL, 'White', 1499.00, 5.00),
(62, 2, 30780, 'Kurtas', '2024-10-22', 'Fabindia', 'Traditional', 'Daily', NULL, 'Blue', 430.00, 5.00),
(63, 2, 50649, 'Lounge Pants', '2024-10-22', 'Chromozome', 'Bottomwear', '', NULL, 'Grey', 549.00, 1.00),
(64, 2, 7182, 'Track Pants', '2024-10-22', 'Jealous 21', 'Bottomwear', '', NULL, 'Blue', 1499.00, 4.00);

-- --------------------------------------------------------

--
-- Table structure for table `recommended_purchasing_history`
--

CREATE TABLE `recommended_purchasing_history` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `purchaseDate` date DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `occasion` varchar(100) DEFAULT NULL,
  `productUsage` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `browsing_history`
--
ALTER TABLE `browsing_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart_history`
--
ALTER TABLE `cart_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `frequent_data`
--
ALTER TABLE `frequent_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `generated_browsing_history`
--
ALTER TABLE `generated_browsing_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `generated_cart_history`
--
ALTER TABLE `generated_cart_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `generated_frequent_data`
--
ALTER TABLE `generated_frequent_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `generated_purchasing_history`
--
ALTER TABLE `generated_purchasing_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchasing_history`
--
ALTER TABLE `purchasing_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recommended_browsing_history`
--
ALTER TABLE `recommended_browsing_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recommended_cart_history`
--
ALTER TABLE `recommended_cart_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recommended_frequent_data`
--
ALTER TABLE `recommended_frequent_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recommended_purchasing_history`
--
ALTER TABLE `recommended_purchasing_history`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `browsing_history`
--
ALTER TABLE `browsing_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `cart_history`
--
ALTER TABLE `cart_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `frequent_data`
--
ALTER TABLE `frequent_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `generated_browsing_history`
--
ALTER TABLE `generated_browsing_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `generated_cart_history`
--
ALTER TABLE `generated_cart_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `generated_frequent_data`
--
ALTER TABLE `generated_frequent_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `generated_purchasing_history`
--
ALTER TABLE `generated_purchasing_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `purchasing_history`
--
ALTER TABLE `purchasing_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `recommended_browsing_history`
--
ALTER TABLE `recommended_browsing_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recommended_cart_history`
--
ALTER TABLE `recommended_cart_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `recommended_frequent_data`
--
ALTER TABLE `recommended_frequent_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `recommended_purchasing_history`
--
ALTER TABLE `recommended_purchasing_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
