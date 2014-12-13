<?php
		//Fehler-Array	
		$errors = array();
		$error = "";

		
		//Überprüfung ob Formular abgeschickt wurde
		if(isset($_POST['submit']) && $_POST['submit']=='Speichern'){	
					
			
			$weight = $_POST['weight'];
						
			if($weight == ""){
				$errors[]= "Bitte geben Sie ein Gewicht ein.";			
			}
			
			// Prüft, ob Fehler aufgetreten sind
			if(count($errors)){
				 echo "Die Änderungen konnten nicht gespeichert werden:<br>\n";
				 foreach($errors as $error)
					 echo "-".$error."<br>\n";
				
			}
			else{// Daten in die Datenbanktabelle einfügen		
			
				try{
					$db = new DBMySQL();
					$connection = $db->getConn();		
					$db->selectDB();
				}catch(Exception $e){
					echo  "Es gab einen Fehler beim Abspeichern!";
				}
				
				$sql = "UPDATE amount set weight = ".mysql_real_escape_string($weight)." ".
							"WHERE ID = 1";
				$res = mysql_query($sql, $connection);	
				
				echo '<script type="text/javascript">'
						   , 'window.alert("Die Futtereinheit wurde gespeichert");'
						   ,'window.location = "index.php";'
						   , '</script>';
				echo "Weiterleitung...";
				exit;
			}
			
		}
		else {
			try{
				$db = new DBMySQL();
				$connection = $db->getConn();		
				$db->selectDB();
			}catch(Exception $e){
				echo  $e->getMessage();
			}	
			$sql = "SELECT * FROM amount";
			$db_erg = mysql_query($sql, $connection);
			$res = mysql_fetch_row($db_erg);
			$turn = $res[1];
			$weight = $res[2];
		}
			
	

?>
<h3 class = "title">Futtermenge einstellen</h3>
<form action= "index.php?page=foodAmount" method="post" enctype="multipart/form-data" name = "foodAmount"> 
	<div data-role = "fieldcontain">
		<label for="turn">Einheit (Umdrehung): </label>
		<input type="text" name="turn"  value = "<?php echo $turn ?>" disabled >
	</div>
	<div data-role = "fieldcontain">
		<label for="weight">Gramm: </label>
		<input type="text" name="weight"  value = "<?php echo $weight ?>">
	</div>
	<div data-role = "fieldcontain">
		<input type="submit" data-inline="true" name = "submit" value="Speichern" >	
	</div>		
</form>

