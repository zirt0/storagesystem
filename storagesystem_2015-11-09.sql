# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.38)
# Database: storagesystem
# Generation Time: 2015-11-09 03:02:51 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table container
# ------------------------------------------------------------

DROP TABLE IF EXISTS `container`;

CREATE TABLE `container` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `places` int(255) NOT NULL,
  `color` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `container` WRITE;
/*!40000 ALTER TABLE `container` DISABLE KEYS */;

INSERT INTO `container` (`id`, `name`, `places`, `color`)
VALUES
	(1,'containerC1',0,0),
	(2,'containerC2',0,0);

/*!40000 ALTER TABLE `container` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table container_content
# ------------------------------------------------------------

DROP TABLE IF EXISTS `container_content`;

CREATE TABLE `container_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `place_name` varchar(255) NOT NULL,
  `container_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `contracts_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `container_content` WRITE;
/*!40000 ALTER TABLE `container_content` DISABLE KEYS */;

INSERT INTO `container_content` (`id`, `place_name`, `container_id`, `status`, `contracts_id`)
VALUES
	(1,'1',1,1,1),
	(2,'2',1,0,0),
	(3,'3',1,0,0),
	(4,'4',1,1,0),
	(5,'5',1,0,0),
	(6,'6',1,1,2),
	(7,'7',1,1,0),
	(8,'8',1,1,0),
	(9,'9',1,1,0),
	(10,'10',1,1,0),
	(11,'11',1,1,0),
	(12,'12',1,1,0),
	(13,'13',1,0,0),
	(14,'14',1,0,0),
	(15,'15',1,1,0),
	(16,'16',1,0,0),
	(17,'17',1,0,0),
	(18,'18',1,1,0),
	(19,'19',1,0,0),
	(20,'20',1,1,0),
	(21,'21',1,1,0),
	(22,'22',1,0,0),
	(23,'23',1,1,0),
	(24,'24',1,1,0),
	(25,'25',1,1,0);

/*!40000 ALTER TABLE `container_content` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table contracts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contracts`;

CREATE TABLE `contracts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `employer` int(11) DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `container_contents_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;

INSERT INTO `contracts` (`id`, `customer_id`, `employer`, `start_date`, `end_date`, `container_contents_id`)
VALUES
	(1,1,3,'2015-05-13 12:12:00','2015-11-13 12:12:00',1),
	(2,3,2,'2015-04-14 12:12:00','2015-10-14 12:12:00',NULL);

/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table customers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company` varchar(250) NOT NULL,
  `fname` varchar(250) NOT NULL,
  `lname` varchar(250) NOT NULL,
  `kenteken` varchar(100) NOT NULL,
  `merk` varchar(200) NOT NULL,
  `tel` varchar(250) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;

INSERT INTO `customers` (`id`, `company`, `fname`, `lname`, `kenteken`, `merk`, `tel`, `date`)
VALUES
	(1,'Jansen Bouw B.v','Dirk','Stroop','57-3X-22','BMW','0645127895','2015-10-25 03:26:24'),
	(2,'Acces4you','Mark','Bruna','16-XZ-JR','Mercedes','0645127895','2015-10-25 03:26:24'),
	(3,'Quickhelp Bv','ibrahim','Aksoy','12-BL-41','Volkswagen','0645127895','2015-10-25 03:26:24'),
	(4,'Akmedia','Johan','Dirksen','53-VC-12','Suzuki','0645127895','2015-10-25 03:26:24'),
	(5,'Donald Wielsport','Karel','Vlieger','BR-12-BJ','Mazda','0645127895','2015-10-25 03:26:24'),
	(6,'Zeegelaar Transport','Michael','Zeegelaar','90-JR-12','Nissan','0645127895','2015-10-25 03:26:24'),
	(7,'Barabara','John','Legend','90-BN-12','Mercedes','0645127895','2015-10-25 03:26:24'),
	(8,'Bert en Co','Bert','Willemsen','21-12-NB','Volkswagen','0645127895','2015-10-25 03:26:24'),
	(9,'Jannis','Jan','van den berg','hj-12-kj','Hummer','0645127895','2015-10-25 03:26:24'),
	(10,'Blad4Gold','Bart','Vennemansen','29-12-XX','Mercedez','97765162121','2015-10-25 03:26:24');

/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tire_brand
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tire_brand`;

CREATE TABLE `tire_brand` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `brand` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `tire_brand` WRITE;
/*!40000 ALTER TABLE `tire_brand` DISABLE KEYS */;

INSERT INTO `tire_brand` (`id`, `brand`)
VALUES
	(1,'Bridgestone'),
	(2,'Continental'),
	(3,'Dunlop'),
	(4,'GoodYear'),
	(5,'Michelin'),
	(10,'Petlas');

/*!40000 ALTER TABLE `tire_brand` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tires
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tires`;

CREATE TABLE `tires` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `contract_id` int(11) DEFAULT NULL,
  `front_left` int(11) DEFAULT NULL,
  `fron_right` int(11) DEFAULT NULL,
  `back_left` int(11) DEFAULT NULL,
  `back_right` int(11) DEFAULT NULL,
  `sezon` varchar(11) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `tire_profile` varchar(500) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `tires` WRITE;
/*!40000 ALTER TABLE `tires` DISABLE KEYS */;

INSERT INTO `tires` (`id`, `contract_id`, `front_left`, `fron_right`, `back_left`, `back_right`, `sezon`, `brand`, `type`, `tire_profile`, `comment`)
VALUES
	(1,2,NULL,NULL,NULL,NULL,'zomer',NULL,'speed','0.8,0.8,0.8,0.8','Er zit een kleine schade aan de linkervelg');

/*!40000 ALTER TABLE `tires` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `role` varchar(256) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `password`, `status`, `role`)
VALUES
	(1,'adem','password1234',1,'admin'),
	(2,'Ozgur','password1234!',1,'employer'),
	(3,'Hakan','sifre1234!',0,'employer');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
