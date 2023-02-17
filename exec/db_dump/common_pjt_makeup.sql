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
-- Table structure for table `makeup`
--

DROP TABLE IF EXISTS `makeup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `makeup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` varchar(50) DEFAULT NULL,
  `title` varchar(20) NOT NULL,
  `content` varchar(300) NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `duration` int NOT NULL,
  `score` float DEFAULT NULL,
  `count` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `makeup`
--

LOCK TABLES `makeup` WRITE;
/*!40000 ALTER TABLE `makeup` DISABLE KEYS */;
INSERT INTO `makeup` (`id`, `member_id`, `title`, `content`, `img`, `duration`, `score`, `count`) VALUES (58,'J3lcEzRES0iF6ndcFeLu__Q2FAMluMVogpTfK7GyjA0','제니 메이크업','제니의 샤넬 메이크업 도전해봐용!!','https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/jenny.jpg',40,5,2),(59,'Ot-vuKZfM0wWMpw9qsE2TONww7kwsxjVgVms3Xp5yUM','CA 되는법','제가 CA 당선 당시 사용했던\n메이크업 입니다.','https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/11312E24-C7DF-418B-8569-AB1AB04C2570.JPG',30,3,3),(60,'6NidbPsuH37eKMyU8QEyCU7RMok0NJhJXd_NfbMkzPc','카즈하 메이크업','르세라핌 핫한 카즈하 메이크업을 쉽게 따라해봐요.\n잊지마 내가 두고온 토슈즈 ~','https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/%EC%B9%B4%EC%A6%88%ED%95%98.jpeg',30,4.2,5),(61,'vRyGkJjlb18mhco-DvCJbddxl9vgwOlpt9qi6yInjHY','이샤배의 면접 프리패스 메이크업','깔끔하고 단정한 메이크업으로 면접 프리패스 해볼까요???','https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/sabae.PNG',15,0,0),(63,'SryshCOiQb4I3qRIPxojn6gWiUgVCPT8sgUPClRG3Uk','장만월 메이크','호텔 델루나 장만월 아이유 커버메이크업 / \'Hotel Del Luna\' IU Cover Makeup','https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/Image+Pasted+at+2023-2-16+22-17.png',40,0,0),(65,'_iIlKSdHzQDSQY8eFf0NuYK53_1Sbl90sLze44e_JcU','젖은머리+투명뿔테 쓴 메이크업','젖은머리+투명뿔테 쓰고 “쿨톤메이크업” 같이준비 ','https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/%EB%A0%88%EC%98%A4%EC%A0%9C%EC%9D%B4%20%EB%A9%94%EC%9D%B4%ED%81%AC%EC%97%85.png',20,0,0),(66,'GJw295SIZrUFLgLv7o8TmntzqCFs7Ng4FEkZSnZF7Ks','연말 파티 메이크업','연말파티 메이크업은 제가 책임질게요..','https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/%EC%A1%B0%ED%9A%A8%EC%A7%84%20%ED%8C%8C%ED%8B%B0%20%EB%A9%94%EC%9D%B4%ED%81%AC%EC%97%85.png',60,0,0),(67,'gJH98WiCoZOi5Kk8T5i12Wj0jwhZCPptIQ6XjwQO9kU','고양이 상 메이크업','고급스러워 보이는 고양이 상 메이크업','https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/%EC%9C%A0%EC%95%A4%EC%95%84%EC%9D%B8%20%EA%B3%A0%EC%96%91%EC%9D%B4%20%EB%A9%94%EC%9D%B4%ED%81%AC%EC%97%85.png',40,0,0),(68,'iYbGd9xg5JExixNZhZ_gqvEHgXm74yesK9tGnVd35C8','짜민이의 데일리 메이크업','싸피 출근 전 퀵 데일리 메이크업 가보자고~~!!!','https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20230216_234219444.jpg',10,5,1),(69,'Apz5Yl257ViHq_6bFvskfUnraHdkeap-KFoWgHevyYQ','아영뽕 메이크업','아영뽕 메이크업을 따라해봐 ~~\n아주 멋진 스타가 될 수 있엉 ㅎㅎ \n:)','https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20230216_235704074.jpg',20,5,1),(70,'WHI_ZosaBaOh-g4eMuuJrIE95UbSMYQAHvtlbBUlFCY','용용 메이크업','아주 쉬운 데일리 메이크업입니당 속쌍강추','https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/me.jpg',20,0,0),(71,'HKIHfjiCB32i96lx-hxbSvA_ghQ4wAAhBi5KRQKVMq8','다나카 메이크업','우리 모두 다나카가 되어봅시다.','https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%EB%82%98%EC%B9%B4%20%EB%A9%94%EC%9D%B4%ED%81%AC%EC%97%85.jpg',10,4.8,5),(72,'LxRcqMVb77C4EJ3ahzjgcpvl08oLYCy_UV1ZzBy9p9s','밍밍 메이크업','고3 메이크업(?!)','https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/min.jpg',5,4,1),(73,'wVBDG8i7rD9r8F80rZEOm3Ykma9BfBCjKEfsUEjsNvk','장원영 메이크업','장원영 메이크업에 도전한다.','https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/%EC%9E%A5%EC%9B%90%EC%98%81%20%EB%A9%94%EC%9D%B4%ED%81%AC%EC%97%851.jpeg',40,0,0),(74,'5lKavE8ZJYKdn9LjAVSw-v1AwqaV-o1XVZSJxbsln5o','카리나 메이크업','카리나 따라잡기!','https://ssafybeauduck.s3.ap-northeast-2.amazonaws.com/%EC%B9%B4%EB%A6%AC%EB%82%98%20%EB%A9%94%EC%9D%B4%ED%81%AC%EC%97%85.jpg',40,0,0);
/*!40000 ALTER TABLE `makeup` ENABLE KEYS */;
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
