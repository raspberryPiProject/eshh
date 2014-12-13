<?php		
	
	$file = fopen("/tmp/pid.txt", "r") or die("Unable to open file!");
	//get pid
	$pid = fgets($file);
	fclose($file);	
	exec('sudo kill '.$pid);
	echo "Bewegungsmelder gestoppt!";
	echo '<script type="text/javascript">window.location = "index.php";</script>';
	
?>