-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: i8b306.p.ssafy.io    Database: common_pjt
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board_qa`
--

DROP TABLE IF EXISTS `board_qa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_qa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` varchar(50) NOT NULL,
  `writer` varchar(20) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `count` int DEFAULT NULL,
  `likes` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `board_qa_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_qa`
--

LOCK TABLES `board_qa` WRITE;
/*!40000 ALTER TABLE `board_qa` DISABLE KEYS */;
INSERT INTO `board_qa` (`id`, `member_id`, `writer`, `is_active`, `title`, `content`, `count`, `likes`, `created_date`, `updated_date`) VALUES (6,'Apz5Yl257ViHq_6bFvskfUnraHdkeap-KFoWgHevyYQ','아영뿡빵뽕',1,'하이하요','하이하요',11,0,'2023-02-16 01:38:25','2023-02-16 21:18:00'),(7,'qS7hBc58jL-VFSDE2UiLSqrNXYVyytJp-wTcJbdUEEg','구스구스',1,'제 퍼스널 컬러가 궁금해요!','제 퍼스널 컬러가 궁금해요!\n알려주세요!!!!',6,0,'2023-02-16 17:55:27','2023-02-16 23:47:11');
/*!40000 ALTER TABLE `board_qa` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  8:43:01
