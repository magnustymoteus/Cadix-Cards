-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 08, 2021 at 09:49 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbcadixcards`
--
CREATE DATABASE IF NOT EXISTS `dbcadixcards` DEFAULT CHARACTER SET latin1 COLLATE latin1_general_cs;
USE `dbcadixcards`;

-- --------------------------------------------------------

--
-- Table structure for table `tblaankoop`
--

DROP TABLE IF EXISTS `tblaankoop`;
CREATE TABLE `tblaankoop` (
  `aankoopID` int(11) NOT NULL,
  `datum` datetime NOT NULL,
  `betaalstatus` tinyint(4) NOT NULL,
  `klantID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

--
-- Dumping data for table `tblaankoop`
--

INSERT INTO `tblaankoop` (`aankoopID`, `datum`, `betaalstatus`, `klantID`) VALUES
(1, '2021-10-24 22:28:20', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tblaankoopkaart`
--

DROP TABLE IF EXISTS `tblaankoopkaart`;
CREATE TABLE `tblaankoopkaart` (
  `aankoopKaartID` int(11) NOT NULL,
  `aantal` int(11) NOT NULL,
  `kaartID` int(11) NOT NULL,
  `aankoopID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

-- --------------------------------------------------------

--
-- Table structure for table `tblcategorie`
--

DROP TABLE IF EXISTS `tblcategorie`;
CREATE TABLE `tblcategorie` (
  `categorieID` int(11) NOT NULL,
  `categorie` varchar(45) COLLATE latin1_general_cs NOT NULL,
  `omschrijving` tinytext COLLATE latin1_general_cs NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

-- --------------------------------------------------------

--
-- Table structure for table `tblkaart`
--

DROP TABLE IF EXISTS `tblkaart`;
CREATE TABLE `tblkaart` (
  `kaartID` int(11) NOT NULL,
  `kaart` varchar(40) COLLATE latin1_general_cs NOT NULL,
  `omschrijving` text COLLATE latin1_general_cs NOT NULL,
  `prijs` float NOT NULL,
  `afbeelding` varchar(70) COLLATE latin1_general_cs NOT NULL,
  `aantalbeschikbaar` int(11) NOT NULL,
  `categorieID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

-- --------------------------------------------------------

--
-- Table structure for table `tblklant`
--

DROP TABLE IF EXISTS `tblklant`;
CREATE TABLE `tblklant` (
  `klantID` int(11) NOT NULL,
  `naam` varchar(45) COLLATE latin1_general_cs NOT NULL,
  `voornaam` varchar(45) COLLATE latin1_general_cs NOT NULL,
  `geboortedatum` date NOT NULL,
  `geslacht` enum('M','V') COLLATE latin1_general_cs NOT NULL,
  `straat` varchar(70) COLLATE latin1_general_cs NOT NULL,
  `huisnummer` varchar(10) COLLATE latin1_general_cs NOT NULL,
  `bus` varchar(10) COLLATE latin1_general_cs NOT NULL,
  `postcode` varchar(15) COLLATE latin1_general_cs NOT NULL,
  `gemeente` varchar(70) COLLATE latin1_general_cs NOT NULL,
  `land` varchar(45) COLLATE latin1_general_cs NOT NULL,
  `telefoonnummer` varchar(45) COLLATE latin1_general_cs NOT NULL,
  `email` varchar(50) COLLATE latin1_general_cs NOT NULL,
  `wachtwoord` varchar(256) COLLATE latin1_general_cs NOT NULL,
  `admin` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

DROP TABLE IF EXISTS `tblEVKey`;
CREATE TABLE `tblEVKey` (
  `EVKeyID` int(11) NOT NULL,
  `EVKey` varchar(128) COLLATE latin1_general_cs NOT NULL,
  `klantID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

-- Table structure for table `tblEVKey`
--
--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblaankoop`
--
ALTER TABLE `tblaankoop`
  ADD PRIMARY KEY (`aankoopID`);

--
-- Indexes for table `tblaankoopkaart`
--
ALTER TABLE `tblaankoopkaart`
  ADD PRIMARY KEY (`aankoopKaartID`);

--
-- Indexes for table `tblcategorie`
--
ALTER TABLE `tblcategorie`
  ADD PRIMARY KEY (`categorieID`);

--
-- Indexes for table `tblkaart`
--
ALTER TABLE `tblkaart`
  ADD PRIMARY KEY (`kaartID`);

--
-- Indexes for table `tblklant`
--
ALTER TABLE `tblklant`
  ADD PRIMARY KEY (`klantID`);

ALTER TABLE `tblEVKey`
  ADD PRIMARY KEY (`EVKeyID`);
--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblaankoop`
--
ALTER TABLE `tblaankoop`
  MODIFY `aankoopID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tblaankoopkaart`
--
ALTER TABLE `tblaankoopkaart`
  MODIFY `aankoopKaartID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblcategorie`
--
ALTER TABLE `tblcategorie`
  MODIFY `categorieID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblkaart`
--
ALTER TABLE `tblkaart`
  MODIFY `kaartID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblklant`
--
ALTER TABLE `tblklant`
  MODIFY `klantID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
  
ALTER TABLE `tblEVKey`
  MODIFY `EVKeyID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
