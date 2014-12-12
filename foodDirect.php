<?php
header("Content-type: application/json");
require_once("classDB.php");

	//Vorgaengig auf genuegend Futter pruefen
	try{
		$db = new DBMySQL();
		$connection = $db->getConn();		
		$db->selectDB();
	}catch(Exception $e){
		echo  $e->getMessage();
	}
	//Futterstand holen
	$sql = "SELECT WEIGHT FROM fill";
	$res = mysql_query($sql, $connection);								
	$row = mysql_fetch_assoc($res);		
	$fillWeight = $row['WEIGHT'];
	
	//Futtereinheit holen
	$sql = "SELECT * FROM amount";
	$res = mysql_query($sql, $connection);								
	$rowAmount = mysql_fetch_assoc($res);		
	$food = $rowAmount['WEIGHT'];
	
	//Restgewicht berechnen
	$restWeight = $fillWeight - $food;
	
	//Futter-Script starten
	exec("sudo /usr/bin/python /var/www/raspbi/python/stepper.py '' 1");
	
	
	
	$value = array();
	//Falls genuegend Futter vorhanden
	if ($restWeight > 0){		
		$value['msg'] =  'Futter wurde ausgegeben';
	}
	else{//Sonst Fehlermeldung
		$value['msg'] =  'Es hat nicht genuegend Futter im Spender';
	}
	echo json_encode($value);
?>

