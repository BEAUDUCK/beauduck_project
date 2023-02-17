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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` varchar(50) NOT NULL,
  `provider` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` (`id`, `provider`) VALUES ('1sxIVjdWFVs5t9VZM5qrxRkZhNy3ZSgA7NhSAr0DMjU','naver'),('5lKavE8ZJYKdn9LjAVSw-v1AwqaV-o1XVZSJxbsln5o','naver'),('6NidbPsuH37eKMyU8QEyCU7RMok0NJhJXd_NfbMkzPc','naver'),('admin','K'),('Apz5Yl257ViHq_6bFvskfUnraHdkeap-KFoWgHevyYQ','naver'),('diamond1','K'),('diamond2','K'),('diamond3','K'),('diamond4','K'),('diamond5','K'),('gJH98WiCoZOi5Kk8T5i12Wj0jwhZCPptIQ6XjwQO9kU','naver'),('GJw295SIZrUFLgLv7o8TmntzqCFs7Ng4FEkZSnZF7Ks','naver'),('HKIHfjiCB32i96lx-hxbSvA_ghQ4wAAhBi5KRQKVMq8','naver'),('iYbGd9xg5JExixNZhZ_gqvEHgXm74yesK9tGnVd35C8','naver'),('J3lcEzRES0iF6ndcFeLu__Q2FAMluMVogpTfK7GyjA0','naver'),('kimgo','K'),('LxRcqMVb77C4EJ3ahzjgcpvl08oLYCy_UV1ZzBy9p9s','naver'),('oDkuV-MEW8EyWNps8FkdqzTT9KNRyz425ESe46C5HV4','naver'),('Ot-vuKZfM0wWMpw9qsE2TONww7kwsxjVgVms3Xp5yUM','naver'),('qS7hBc58jL-VFSDE2UiLSqrNXYVyytJp-wTcJbdUEEg','naver'),('round','K'),('square','K'),('SryshCOiQb4I3qRIPxojn6gWiUgVCPT8sgUPClRG3Uk','naver'),('team1','K'),('team2','K'),('team3','K'),('team4','K'),('team5','K'),('team6','K'),('team7','K'),('uOohdjnvdIYBE4O95wgj4mSzs1kfGqMt_dXgjlF86Jo','naver'),('vRyGkJjlb18mhco-DvCJbddxl9vgwOlpt9qi6yInjHY','naver'),('WHI_ZosaBaOh-g4eMuuJrIE95UbSMYQAHvtlbBUlFCY','naver'),('wVBDG8i7rD9r8F80rZEOm3Ykma9BfBCjKEfsUEjsNvk','naver'),('_iIlKSdHzQDSQY8eFf0NuYK53_1Sbl90sLze44e_JcU','naver');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
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
