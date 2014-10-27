<?php
	try{
		$db = new DBMySQL();
		$connection = $db->getConn();		
		$db->selectDB();
	}catch(Exception $e){
		echo  $e->getMessage();
	}
	
	$sql = "SELECT * from fill";	
	$res = mysql_query($sql, $connection);		
	
	$res = mysql_fetch_row($res);
	$weight = $res[1];
	$percentage = $res[2];
	echo "<p>Futterstand:</p> <meter value=".$percentage." max = 100></meter>";
?>

