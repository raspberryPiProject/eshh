-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 26. Okt 2014 um 18:57
-- Server Version: 5.6.20
-- PHP-Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

CREATE DATABASE fooddispenser;

--
-- Datenbank: `fooddispenser`
--

use fooddispenser;
-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `amount`
--

CREATE TABLE IF NOT EXISTS `amount` (
`ID` int(11) NOT NULL,
  `TURN` float NOT NULL,
  `WEIGHT` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Daten für Tabelle `amount`
--

INSERT INTO `amount` (`ID`, `TURN`, `WEIGHT`) VALUES
(1, 1, 20);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fill`
--

CREATE TABLE IF NOT EXISTS `fill` (
`ID` int(11) NOT NULL,
  `WEIGHT` int(11) NOT NULL,
  `PERCENTAGE` float NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Daten für Tabelle `fill`
--

INSERT INTO `fill` (`ID`, `WEIGHT`, `PERCENTAGE`) VALUES
(1, 1000, 50);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `movement`
--

CREATE TABLE IF NOT EXISTS `movement` (
`ID` int(11) NOT NULL,
  `DATE` date NOT NULL,
  `TIME` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `schedule`
--

CREATE TABLE IF NOT EXISTS `schedule` (
`ID` int(11) NOT NULL,
  `TIME` time DEFAULT NULL,
  `AMOUNT` int(11) DEFAULT NULL,
  `ACTIVE` tinyint(1) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Daten für Tabelle `schedule`
--

INSERT INTO `schedule` (`ID`, `TIME`, `AMOUNT`, `ACTIVE`) VALUES
(1, '05:00:00', 20, 1),
(2, '07:00:00', 40, 1),
(3, '00:00:00', 0, 0),
(4, '00:00:00', 0, 0),
(5, '00:00:00', 0, 0),
(6, '00:00:00', 0, 0),
(7, '00:00:00', 0, 0),
(8, '00:00:00', 0, 0),
(9, '00:00:00', 0, 0),
(10, '00:00:00', 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `settings`
--

CREATE TABLE IF NOT EXISTS `settings` (
`ID` int(11) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `SETTING` varchar(200) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Daten für Tabelle `settings`
--

INSERT INTO `settings` (`ID`, `NAME`, `SETTING`) VALUES
(1, 'Email-Notification', 'natalie.gobbo@students.ffhs.ch');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amount`
--
ALTER TABLE `amount`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `fill`
--
ALTER TABLE `fill`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `movement`
--
ALTER TABLE `movement`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
 ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `amount`
--
ALTER TABLE `amount`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `fill`
--
ALTER TABLE `fill`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `movement`
--
ALTER TABLE `movement`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
