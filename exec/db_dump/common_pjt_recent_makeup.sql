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
-- Table structure for table `recent_makeup`
--

DROP TABLE IF EXISTS `recent_makeup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recent_makeup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` varchar(50) DEFAULT NULL,
  `makeup_id` int NOT NULL,
  `created_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  KEY `makeup_id` (`makeup_id`),
  CONSTRAINT `recent_makeup_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `recent_makeup_ibfk_2` FOREIGN KEY (`makeup_id`) REFERENCES `makeup` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recent_makeup`
--

LOCK TABLES `recent_makeup` WRITE;
/*!40000 ALTER TABLE `recent_makeup` DISABLE KEYS */;
INSERT INTO `recent_makeup` (`id`, `member_id`, `makeup_id`, `created_date`) VALUES (18,'_iIlKSdHzQDSQY8eFf0NuYK53_1Sbl90sLze44e_JcU',58,'2023-02-16 16:13:27'),(19,'6NidbPsuH37eKMyU8QEyCU7RMok0NJhJXd_NfbMkzPc',60,'2023-02-16 16:17:19'),(20,'WHI_ZosaBaOh-g4eMuuJrIE95UbSMYQAHvtlbBUlFCY',58,'2023-02-16 17:47:26'),(21,'uOohdjnvdIYBE4O95wgj4mSzs1kfGqMt_dXgjlF86Jo',59,'2023-02-16 22:37:19'),(22,'uOohdjnvdIYBE4O95wgj4mSzs1kfGqMt_dXgjlF86Jo',59,'2023-02-16 23:07:29'),(23,'uOohdjnvdIYBE4O95wgj4mSzs1kfGqMt_dXgjlF86Jo',59,'2023-02-16 23:28:33'),(24,'iYbGd9xg5JExixNZhZ_gqvEHgXm74yesK9tGnVd35C8',68,'2023-02-16 23:59:23'),(25,'Apz5Yl257ViHq_6bFvskfUnraHdkeap-KFoWgHevyYQ',69,'2023-02-17 00:09:45'),(26,'Apz5Yl257ViHq_6bFvskfUnraHdkeap-KFoWgHevyYQ',71,'2023-02-17 00:12:20'),(27,'WHI_ZosaBaOh-g4eMuuJrIE95UbSMYQAHvtlbBUlFCY',71,'2023-02-17 00:12:38'),(28,'iYbGd9xg5JExixNZhZ_gqvEHgXm74yesK9tGnVd35C8',71,'2023-02-17 00:12:42'),(29,'iYbGd9xg5JExixNZhZ_gqvEHgXm74yesK9tGnVd35C8',72,'2023-02-17 02:01:03'),(30,'uOohdjnvdIYBE4O95wgj4mSzs1kfGqMt_dXgjlF86Jo',71,'2023-02-17 03:10:54'),(31,'iYbGd9xg5JExixNZhZ_gqvEHgXm74yesK9tGnVd35C8',71,'2023-02-17 03:46:14'),(32,'iYbGd9xg5JExixNZhZ_gqvEHgXm74yesK9tGnVd35C8',60,'2023-02-17 03:53:31'),(33,'iYbGd9xg5JExixNZhZ_gqvEHgXm74yesK9tGnVd35C8',60,'2023-02-17 03:54:53'),(34,'uOohdjnvdIYBE4O95wgj4mSzs1kfGqMt_dXgjlF86Jo',60,'2023-02-17 04:59:40'),(35,'iYbGd9xg5JExixNZhZ_gqvEHgXm74yesK9tGnVd35C8',60,'2023-02-17 05:58:00');
/*!40000 ALTER TABLE `recent_makeup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  8:42:55
