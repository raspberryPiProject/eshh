-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb2+deb7u1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 12. Dez 2014 um 16:55
-- Server Version: 5.5.40
-- PHP-Version: 5.4.4-14+deb7u14

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `fooddispenser`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `amount`
--

CREATE TABLE IF NOT EXISTS `amount` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TURN` float NOT NULL,
  `WEIGHT` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
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
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `WEIGHT` int(11) NOT NULL,
  `PERCENTAGE` float NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Daten für Tabelle `fill`
--

INSERT INTO `fill` (`ID`, `WEIGHT`, `PERCENTAGE`) VALUES
(1, 2000, 100);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `log`
--

CREATE TABLE IF NOT EXISTS `log` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DATE` date NOT NULL,
  `TIME` time NOT NULL,
  `ERROR` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=38 ;

--
-- Daten für Tabelle `log`
--

INSERT INTO `log` (`ID`, `DATE`, `TIME`, `ERROR`) VALUES
(33, '2014-12-12', '13:18:00', 'Not enough food'),
(34, '2014-12-12', '13:26:00', 'Not enough food'),
(35, '2014-12-12', '13:38:00', 'Not enough food'),
(36, '2014-12-12', '14:46:00', 'Not enough food'),
(37, '2014-12-12', '15:06:00', 'Not enough food');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `movement`
--

CREATE TABLE IF NOT EXISTS `movement` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DATE` date NOT NULL,
  `TIME` time NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=173 ;

--
-- Daten für Tabelle `movement`
--

INSERT INTO `movement` (`ID`, `DATE`, `TIME`) VALUES
(88, '2014-12-12', '04:30:00'),
(89, '2014-12-12', '06:59:00'),
(90, '2014-12-12', '11:05:00'),
(92, '2014-12-11', '20:35:13'),
(93, '2014-12-11', '20:35:43'),
(94, '2014-12-11', '20:54:08'),
(95, '2014-12-11', '20:54:48'),
(96, '2014-12-11', '21:45:38');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `schedule`
--

CREATE TABLE IF NOT EXISTS `schedule` (
  `ID` int(11) NOT NULL,
  `TIME` time DEFAULT NULL,
  `AMOUNT` int(11) DEFAULT NULL,
  `ACTIVE` tinyint(1) NOT NULL,
  `CRONJOBID` varchar(8) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `schedule`
--

INSERT INTO `schedule` (`ID`, `TIME`, `AMOUNT`, `ACTIVE`, `CRONJOBID`) VALUES
(1, '05:00:00', 20, 1, 'ar3raq'),
(2, '07:00:00', 40, 1, '20uths'),
(3, '11:36:00', 30, 1, 'idn2wg'),
(4, '15:05:00', 20, 1, 'z5hmaz'),
(5, '00:00:00', 0, 0, ''),
(6, '00:00:00', 0, 0, ''),
(7, '00:00:00', 0, 0, ''),
(8, '00:00:00', 0, 0, ''),
(9, '00:00:00', 0, 0, ''),
(10, '00:00:00', 0, 0, '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `settings`
--

CREATE TABLE IF NOT EXISTS `settings` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) NOT NULL,
  `SETTING` varchar(200) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Daten für Tabelle `settings`
--

INSERT INTO `settings` (`ID`, `NAME`, `SETTING`) VALUES
(1, 'Email-Notification', 'raspberrypiffhs@gmail.com');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
