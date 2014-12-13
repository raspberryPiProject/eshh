<?php
if (!isset($_GET['page']))
{
	$_GET['page'] = "home";
} 
$page = $_GET['page'];

require_once("classDB.php");
require_once("cron/CronEntry.php");
require_once("cron/CrontabManager.php");

?>
<!DOCTYPE html>
<html>
	<head>			
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		
		<!-- Stylesheet -->
		<link rel="stylesheet" type="text/css" href="css/styles.css">
		<link rel="stylesheet" href="css/jquery.mobile-1.4.4.min.css" />
		<link rel="stylesheet"  href="css/jquery.mobile.icons-1.4.2.css" />		
		<link rel="stylesheet" href="css/jqm-datebox-1.4.4.min.css" />
		<link rel="stylesheet" type="text/css" href="css/timeline.css">
		<link rel="stylesheet"  href="css/jqm-icon-pack-fa.css" />
		
		<!-- favicon -->		
		<link rel="icon" type="image/x-icon" href="images/favicon.ico">
		
		<!-- Java-Script-->
		<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>		
		<script type="text/javascript" src="js/jquery-2.1.1.js"></script>
		<script type="text/javascript" src="js/jquery.mobile-1.4.4.min.js"></script>
		
		<script type="text/javascript" src="js/timeline.js"></script>
		<script type="text/javascript" src="js/calendarbox.js"></script>		
		<script type="text/javascript" src="js/timeflipbox.js"></script>			
		<script type="text/javascript" src ="js/jqm-datebox-1.4.4.mode.calbox.min.js"></script>
		<script>	
			$(document).ajaxStart(function() {
				$.mobile.loading( 'show', {
					text: 'Futter wird ausgegeben....',
					textVisible: true,
					theme: 'z',
					html: ""
				});
			});

			$(document).ajaxStop(function() {
				$.mobile.loading('hide');
			});		
			
			function callScript() {
			
				$.ajax(
				{        						
					type:'POST',      
					contentType: "application/json",	
					url: 'foodDirect.php',
					dataType: 'json',
					success: function(data, textStatus, jqXHR)
					{		
						window.alert(data.msg);
					},
					error: function(jqXHR, textStatus, errorThrown) { 						
						alert("Status: " + jqXHR.responseText); 
					}       
				});
			}
			
			
		</script>
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
			</div>				
			<!-- footer -->
			<div data-role = "footer" data-theme="a" data-position="fixed"><h3 class = "footer">&copy; N. Gobbo, R. Ziegler</h3></div>				
		</div>
	</body>
</html>