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
-- Table structure for table `member_profile`
--

DROP TABLE IF EXISTS `member_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` varchar(50) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `content` varchar(300) DEFAULT NULL,
  `exp` int DEFAULT NULL,
  `badge` varchar(50) DEFAULT NULL,
  `is_private` tinyint(1) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `member_profile_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_profile`
--

LOCK TABLES `member_profile` WRITE;
/*!40000 ALTER TABLE `member_profile` DISABLE KEYS */;
INSERT INTO `member_profile` (`id`, `member_id`, `nickname`, `img`, `content`, `exp`, `badge`, `is_private`, `created_date`, `updated_date`) VALUES (5,'HKIHfjiCB32i96lx-hxbSvA_ghQ4wAAhBi5KRQKVMq8','규림',NULL,'컨텐츠',0,'입덕',0,'2023-02-11 22:45:41','2023-02-11 22:45:41'),(8,'Apz5Yl257ViHq_6bFvskfUnraHdkeap-KFoWgHevyYQ','아영뿡빵뽕',NULL,'나는 아영뽕입니다ㅎㅎㅎ 만나서 만가워요',0,'입덕',0,'2023-02-11 23:04:18','2023-02-11 23:05:37'),(9,'WHI_ZosaBaOh-g4eMuuJrIE95UbSMYQAHvtlbBUlFCY','용용',NULL,'아아',0,'입덕',0,'2023-02-12 03:22:27','2023-02-12 03:22:27'),(10,'uOohdjnvdIYBE4O95wgj4mSzs1kfGqMt_dXgjlF86Jo','주승',NULL,'안녕하세요.',0,'입덕',0,'2023-02-13 17:34:05','2023-02-13 17:34:05'),(11,'oDkuV-MEW8EyWNps8FkdqzTT9KNRyz425ESe46C5HV4','너구리',NULL,'자고싶은 너굴...',0,'입덕',0,'2023-02-13 21:14:11','2023-02-13 21:14:11'),(12,'iYbGd9xg5JExixNZhZ_gqvEHgXm74yesK9tGnVd35C8','짜민',NULL,'하위하위~~~',0,'입덕',0,'2023-02-14 12:49:23','2023-02-14 12:49:23'),(14,'_iIlKSdHzQDSQY8eFf0NuYK53_1Sbl90sLze44e_JcU','현혁',NULL,'아영 최고??',0,'입덕',0,'2023-02-14 16:56:27','2023-02-15 12:28:43'),(15,'1sxIVjdWFVs5t9VZM5qrxRkZhNy3ZSgA7NhSAr0DMjU','asd12',NULL,'asd',0,'입덕',0,'2023-02-15 10:52:37','2023-02-15 10:52:37'),(17,'LxRcqMVb77C4EJ3ahzjgcpvl08oLYCy_UV1ZzBy9p9s','밍밍',NULL,'안녕',0,'입덕',0,'2023-02-15 22:07:17','2023-02-15 22:07:17'),(19,'J3lcEzRES0iF6ndcFeLu__Q2FAMluMVogpTfK7GyjA0','제니',NULL,'모두 문 닫고 Shutdown',0,'입덕',0,'2023-02-16 15:47:01','2023-02-16 15:47:01'),(20,'6NidbPsuH37eKMyU8QEyCU7RMok0NJhJXd_NfbMkzPc','카즈하',NULL,'잊지마 내가 두고 온 토슈즈',0,'입덕',0,'2023-02-16 15:50:07','2023-02-16 15:50:07'),(21,'Ot-vuKZfM0wWMpw9qsE2TONww7kwsxjVgVms3Xp5yUM','최현인',NULL,'안녕하세용 최현인입니당',0,'입덕',0,'2023-02-16 16:04:49','2023-02-16 16:04:49'),(22,'vRyGkJjlb18mhco-DvCJbddxl9vgwOlpt9qi6yInjHY','이샤배',NULL,'안녕하세요~ 뷰티 유튜버 이샤배입니다!!',0,'입덕',0,'2023-02-16 16:21:20','2023-02-16 16:21:20'),(23,'SryshCOiQb4I3qRIPxojn6gWiUgVCPT8sgUPClRG3Uk','아이유',NULL,'난 호텔 델루나 장만월. 우리 호텔에 놀러와',0,'입덕',0,'2023-02-16 16:22:26','2023-02-16 16:22:26'),(24,'qS7hBc58jL-VFSDE2UiLSqrNXYVyytJp-wTcJbdUEEg','구스구스',NULL,'구스구스덕',0,'입덕',0,'2023-02-16 17:53:10','2023-02-16 17:53:10'),(25,'GJw295SIZrUFLgLv7o8TmntzqCFs7Ng4FEkZSnZF7Ks','조효진',NULL,'다양한 메이크업을 할 수 있도록 제가 도와드립니다.',0,'입덕',0,'2023-02-16 23:01:14','2023-02-16 23:01:14'),(26,'gJH98WiCoZOi5Kk8T5i12Wj0jwhZCPptIQ6XjwQO9kU','유앤아인',NULL,'모든 메이크업 나한테 다있지!',0,'입덕',0,'2023-02-16 23:26:25','2023-02-16 23:26:25'),(27,'wVBDG8i7rD9r8F80rZEOm3Ykma9BfBCjKEfsUEjsNvk','장원영',NULL,'숨 참고 러브 다이브~',0,'입덕',0,'2023-02-17 00:57:49','2023-02-17 00:57:49'),(28,'5lKavE8ZJYKdn9LjAVSw-v1AwqaV-o1XVZSJxbsln5o','jhy',NULL,'안녕하세요',0,'입덕',0,'2023-02-17 03:58:56','2023-02-17 03:58:56');
/*!40000 ALTER TABLE `member_profile` ENABLE KEYS */;
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
