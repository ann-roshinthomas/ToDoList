CREATE TABLE `todotasks` (
  `taskID` int NOT NULL AUTO_INCREMENT,
  `taskName` varchar(500) DEFAULT NULL,
  `completed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`taskID`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;