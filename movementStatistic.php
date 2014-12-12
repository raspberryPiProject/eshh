<?php
	require_once("classDB.php");
	
	//Fehler-Array	
	$errors = array();
	$error = "";
	
?>

<!DOCTYPE html>
<html>
	<head>			
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<!-- Stylesheet -->
		<link rel="stylesheet" type="text/css" href="css/styles.css">
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.4/jquery.mobile-1.4.4.min.css" />
		<link rel="stylesheet" type="text/css" href="css/timeline.css">
		
		<!-- Java-Script-->			
		<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.js"></script>
		<script type="text/javascript" src="http://code.jquery.com/mobile/1.4.4/jquery.mobile-1.4.4.min.js"></script>	
		<script type="text/javascript" src="js/timeline.js"></script>	
		
		<!-- Title -->		
		<title>Raspbi Futtersteuerung</title>		
	</head>
	<body onload="drawVisualization();">
	<h1>Bewegungsmeldungen</h1>
<?php

//Überprüfung ob Formular abgeschickt wurde
if(isset($_POST['submit']) && $_POST['submit']=='Senden'){		


	$datePicked = $_POST['datePick'];
	
	echo "<h2>Datum: ".$datePicked."</h2>";
	
	$temp = explode(".", $datePicked);
	$date = $temp[2]."-".$temp[1]."-".$temp[0];
	if($date=="")
	{
		$errors[] = "Sie haben kein Datum gewählt!";
	}
				
	// Prüft, ob Fehler aufgetreten sind
	if(count($errors)){
		 echo "Die Statistik kann nicht angezeigt werden:<br>\n";
		 foreach($errors as $error)
			 echo "-".$error."<br>\n";
		
	}
	else{// Daten holen
	
		try{
			$db = new DBMySQL();
			$connection = $db->getConn();		
			$db->selectDB();
		}catch(Exception $e){
			echo  $e->getMessage();
		}	
		
		$sql ="SELECT year(DATE) as Year, ".
				"month(DATE) as Month , ".
				"day(DATE) as Day, ".
				"hour(TIME) as Hour, ".
				"minute(Time) as Minute ".
				"FROM movement WHERE DATE = '".$date."' ORDER BY TIME";
		$db_erg = mysql_query($sql, $connection);
		
		$data = array();

		while($row = mysql_fetch_assoc($db_erg))	
		{
			$month = $row['Month'] - 1;
			$data[] = "{'start': new Date(".$row['Year'].",".$month.
						",".$row['Day'].",".$row['Hour'].",".$row['Minute']."),'content': '=^_^= <br>".$row['Hour'].":".str_pad($row['Minute'], 2 ,'0', STR_PAD_LEFT)."'}";
		 
		}
		
		$json_encode = json_encode($data, JSON_UNESCAPED_SLASHES);
		$json_encode = str_replace('"', '', $json_encode);
		$minYear = date('Y', strtotime($date));
		$minMonth = date('m', strtotime($date))-1;
		$minDay = date('d', strtotime($date));
		$maxDay = date('d', strtotime($date))+1;
	

?>
		<script type="text/javascript">
				var timeline;	
				function drawVisualization() {
					// create and populate an array with data
					var data = <?php echo $json_encode; ?>;	
					
					// specify options
					var options = {
						"width":  "100%",
						"height": "300px",
						"min": new Date(<?php echo $minYear.",".$minMonth.",".$minDay;?>),                // lower limit of visible range
						"max": new Date(<?php echo $minYear.",".$minMonth.",".$maxDay;?>),                // upper limit of visible range
						"zoomMin": 1000 * 60 * 60 * 24,             // one day in milliseconds
						"zoomMax": 1000 * 60 * 60 * 24 * 31 * 3     // about three months in milliseconds
					};

					// Instantiate our timeline object.
					timeline = new links.Timeline(document.getElementById('mytimeline'), options);

					// Draw our timeline with the created data and options
					timeline.draw(data);
				}
		</script>
		<div id="mytimeline"></div>
<?php
	}
}
?>
	
	</body>
</html>


