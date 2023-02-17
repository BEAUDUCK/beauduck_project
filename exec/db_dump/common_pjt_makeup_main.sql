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
-- Table structure for table `makeup_main`
--

DROP TABLE IF EXISTS `makeup_main`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `makeup_main` (
  `id` int NOT NULL AUTO_INCREMENT,
  `makeup_id` int DEFAULT NULL,
  `step` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `makeup_id` (`makeup_id`),
  CONSTRAINT `makeup_main_ibfk_1` FOREIGN KEY (`makeup_id`) REFERENCES `makeup` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `makeup_main`
--

LOCK TABLES `makeup_main` WRITE;
/*!40000 ALTER TABLE `makeup_main` DISABLE KEYS */;
INSERT INTO `makeup_main` (`id`, `makeup_id`, `step`) VALUES (81,58,'skin'),(82,58,'eyebrow'),(83,58,'eye'),(84,58,'conture'),(85,58,'lip'),(86,59,'skin'),(87,59,'eyebrow'),(88,59,'eye'),(89,59,'conture'),(90,59,'lip'),(91,60,'skin'),(92,60,'eyebrow'),(93,60,'eye'),(94,60,'conture'),(95,60,'lip'),(96,61,'skin'),(97,61,'eyebrow'),(98,61,'eye'),(99,61,'conture'),(100,61,'lip'),(106,63,'skin'),(107,63,'eyebrow'),(108,63,'eye'),(109,63,'conture'),(110,63,'lip'),(116,65,'skin'),(117,65,'eyebrow'),(118,65,'eye'),(119,65,'conture'),(120,65,'lip'),(121,66,'skin'),(122,66,'eyebrow'),(123,66,'eye'),(124,66,'conture'),(125,66,'lip'),(126,67,'skin'),(127,67,'eyebrow'),(128,67,'eye'),(129,67,'conture'),(130,67,'lip'),(131,68,'skin'),(132,68,'eyebrow'),(133,68,'eye'),(134,68,'conture'),(135,68,'lip'),(136,69,'skin'),(137,69,'eyebrow'),(138,69,'eye'),(139,69,'conture'),(140,69,'lip'),(141,70,'skin'),(142,70,'eyebrow'),(143,70,'eye'),(144,70,'conture'),(145,70,'lip'),(146,71,'skin'),(147,71,'eyebrow'),(148,71,'eye'),(149,71,'conture'),(150,71,'lip'),(151,72,'skin'),(152,72,'eyebrow'),(153,72,'eye'),(154,72,'conture'),(155,72,'lip'),(156,73,'skin'),(157,73,'eyebrow'),(158,73,'eye'),(159,73,'conture'),(160,73,'lip'),(161,74,'skin'),(162,74,'eyebrow'),(163,74,'eye'),(164,74,'conture'),(165,74,'lip');
/*!40000 ALTER TABLE `makeup_main` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  8:43:00
