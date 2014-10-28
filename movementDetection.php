<?php

//Fehler-Array	
$errors = array();
$error = "";


/****** Leider funktioniert Formular-Uebergabe noch nicht, Timeline wird einfach nicht angezeigt :( $
deshalb noch fixes Datum
2Do: datePicker.php muss noch dazwischen geschaltet werden

*****/

//Überprüfung ob Formular abgeschickt wurde
///if(isset($_POST['submit']) && $_POST['submit']=='Senden'){		


	$date = "27.10.2014";
	$date = date('Y', strtotime($date))."-".date('m', strtotime($date))."-".date('d', strtotime($date));
	
	if($date=="")
	{
		$errors[] = "Sie haben kein Datum gewählt!";
	}
				
	// Prüft, ob Fehler aufgetreten sind
	if(count($errors)){
		 echo "Die Änderungen konnten nicht gespeichert werden:<br>\n";
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
						",".$row['Day'].",".$row['Hour'].",".$row['Minute']."),'content': 'Cat moved'}";
		 
		}
		
		$json_encode = json_encode($data, JSON_UNESCAPED_SLASHES);
		$json_encode = str_replace('"', '', $json_encode);
		$minYear = date('Y', strtotime($date));
		$minMonth = date('m', strtotime($date))-1;
		$minDay = date('d', strtotime($date));
		$maxDay = date('d', strtotime($date))+1;
		//}}
	}
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
<body onload="drawVisualization();">
	<div id="mytimeline"></div>
</body>
