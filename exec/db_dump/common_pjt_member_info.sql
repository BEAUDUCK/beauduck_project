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
-- Table structure for table `member_info`
--

DROP TABLE IF EXISTS `member_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` varchar(50) NOT NULL,
  `name` varchar(10) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `sex` varchar(5) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `member_info_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_info`
--

LOCK TABLES `member_info` WRITE;
/*!40000 ALTER TABLE `member_info` DISABLE KEYS */;
INSERT INTO `member_info` (`id`, `member_id`, `name`, `phone_number`, `email`, `age`, `sex`, `created_date`, `updated_date`) VALUES (6,'HKIHfjiCB32i96lx-hxbSvA_ghQ4wAAhBi5KRQKVMq8','최규림','010-1234-1234','test@naver.com',0,'m','2023-02-11 22:45:41',NULL),(9,'Apz5Yl257ViHq_6bFvskfUnraHdkeap-KFoWgHevyYQ','김아영','010-1234-1234','test@naver.com',0,'m','2023-02-11 23:04:18',NULL),(10,'WHI_ZosaBaOh-g4eMuuJrIE95UbSMYQAHvtlbBUlFCY','조용현','010-1234-1234','test@naver.com',0,'m','2023-02-12 03:22:27',NULL),(11,'uOohdjnvdIYBE4O95wgj4mSzs1kfGqMt_dXgjlF86Jo','박주승','010-1234-1234','test@naver.com',0,'m','2023-02-13 17:34:05',NULL),(12,'oDkuV-MEW8EyWNps8FkdqzTT9KNRyz425ESe46C5HV4','오태훈','010-1234-1234','test@naver.com',0,'m','2023-02-13 21:14:11',NULL),(13,'iYbGd9xg5JExixNZhZ_gqvEHgXm74yesK9tGnVd35C8','백자민','010-1234-1234','test@naver.com',0,'m','2023-02-14 12:49:23',NULL),(15,'_iIlKSdHzQDSQY8eFf0NuYK53_1Sbl90sLze44e_JcU','장현혁','010-1234-1234','test@naver.com',0,'m','2023-02-14 16:56:27',NULL),(16,'1sxIVjdWFVs5t9VZM5qrxRkZhNy3ZSgA7NhSAr0DMjU','한윤석','010-1234-1234','test@naver.com',0,'m','2023-02-15 10:52:37',NULL),(18,'LxRcqMVb77C4EJ3ahzjgcpvl08oLYCy_UV1ZzBy9p9s','조용민','010-1234-1234','test@naver.com',0,'m','2023-02-15 22:07:17',NULL),(20,'J3lcEzRES0iF6ndcFeLu__Q2FAMluMVogpTfK7GyjA0','김아린','010-1234-1234','test@naver.com',0,'m','2023-02-16 15:47:01',NULL),(21,'6NidbPsuH37eKMyU8QEyCU7RMok0NJhJXd_NfbMkzPc','김동률','010-1234-1234','test@naver.com',0,'m','2023-02-16 15:50:07',NULL),(22,'Ot-vuKZfM0wWMpw9qsE2TONww7kwsxjVgVms3Xp5yUM','최현인','010-1234-1234','test@naver.com',0,'m','2023-02-16 16:04:49',NULL),(23,'vRyGkJjlb18mhco-DvCJbddxl9vgwOlpt9qi6yInjHY','백자민','010-1234-1234','test@naver.com',0,'m','2023-02-16 16:21:20',NULL),(24,'SryshCOiQb4I3qRIPxojn6gWiUgVCPT8sgUPClRG3Uk','정상민','010-1234-1234','test@naver.com',0,'m','2023-02-16 16:22:26',NULL),(25,'qS7hBc58jL-VFSDE2UiLSqrNXYVyytJp-wTcJbdUEEg','이현구','010-1234-1234','test@naver.com',0,'m','2023-02-16 17:53:10',NULL),(26,'GJw295SIZrUFLgLv7o8TmntzqCFs7Ng4FEkZSnZF7Ks','장현혁','010-1234-1234','test@naver.com',0,'m','2023-02-16 23:01:14',NULL),(27,'gJH98WiCoZOi5Kk8T5i12Wj0jwhZCPptIQ6XjwQO9kU','이혜경','010-1234-1234','test@naver.com',0,'m','2023-02-16 23:26:25',NULL),(28,'wVBDG8i7rD9r8F80rZEOm3Ykma9BfBCjKEfsUEjsNvk','박주승','010-1234-1234','test@naver.com',0,'m','2023-02-17 00:57:49',NULL),(29,'5lKavE8ZJYKdn9LjAVSw-v1AwqaV-o1XVZSJxbsln5o','장현영','010-1234-1234','test@naver.com',0,'m','2023-02-17 03:58:56',NULL);
/*!40000 ALTER TABLE `member_info` ENABLE KEYS */;
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
