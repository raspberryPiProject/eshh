<?php		

	//Überprüfung ob Formular abgeschickt wurde
	if(isset($_POST['submit']) && $_POST['submit']=='Senden'){		
		
		$value = $_POST['value'];		
		
		//Kommando und Pfade fuer Errors und Process-ID
		$cmd = "sudo /usr/bin/python /var/www/raspbi/python/movement.py ".$value;
		$outputfile = "/tmp/test.txt";
		$pidfile = "/tmp/pid.txt";
		
		//Inhalt zuerst loeschen, falls File schon existiert
		if(file_exists ($pidfile)){
			$file = fopen($pidfile, "w+") or die("Unable to open file!");
			fclose($file);
		}
		
		exec(sprintf("%s > %s 2>&1 & echo $! >> %s", $cmd, $outputfile, $pidfile));
		echo "Bewegungsmelder gestartet!";
		echo '<script type="text/javascript">window.location = "index.php";</script>';
		exit();
	}
?>



<h3 class = "title">Sensibilit&auml;t f&uuml;r Bewegungsstatistik w&auml;hlen</h3>
<form action= "index.php?page=movementStart" method="post" enctype="multipart/form-data" name = "pickValue" data-ajax="false"> 
	<div class="ui-field-contain">
		<label for="value">Wartezeit (sek)</label>
		<input name="value" type="number" value="<?php echo "300";?>"/>
	</div>
	<input type="submit" name="submit" value="Senden">
</form>