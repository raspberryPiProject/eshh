<?php
if (!isset($_GET['page']))
{
	$_GET['page'] = "home";
} 
$page = $_GET['page'];

require_once("classDB.php");
?>
<!DOCTYPE html>
<html>
	<head>			
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<!-- Stylesheet -->
		<link rel="stylesheet" type="text/css" href="styles.css">
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.4/jquery.mobile-1.4.4.min.css" />
		<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
		<link rel="stylesheet" href="http://cdn.jtsage.com/datebox/1.4.4/jqm-datebox-1.4.4.min.css" />
		<!-- Java-Script-->
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.1.min.js"></script>		
		<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.js"></script>
		<script type="text/javascript" src="http://code.jquery.com/mobile/1.4.4/jquery.mobile-1.4.4.min.js"></script>	
		<script type="text/javascript" src="js/timeflipbox.js"></script>
		<!-- Title -->		
		<title>Raspbi Futtersteuerung</title>		
	</head>
	<body>
		<div data-role="page" data-theme="a">
			<!-- header -->
			<div data-role="header" data-theme="a">
				<a href="index.php" data-icon="home" data-iconpos="notext">Start</a>
				<img border="0" height = "50" width = "60" src="images/logo.gif" style="float:right;display:inline"/>
				<h1>Raspbi<br>Futtersteuerung</h1>
			</div>
			<!-- content -->	
			<div data-role="content" >
				<?php  include("content.php");?>	
				<?php include("foodStatus.php");?>				
			</div>			
			<!-- footer -->
			<div data-role = "footer" data-theme="a" data-position="fixed"><h3 class = "footer">(c) N. Gobbo, R. Ziegler</h3></div>				
		</div>
	</body>
</html>