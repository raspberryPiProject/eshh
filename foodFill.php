<?php
		//Fehler-Array	
		$errors = array();
		$error = "";

		
		//Überprüfung ob Formular abgeschickt wurde
		if(isset($_POST['submit']) && $_POST['submit']=='Speichern'){	
			
			
			$percentage = $_POST['fill'];
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
					echo  $e->getMessage();
				}
				$sql = "UPDATE fill set percentage = ".mysql_real_escape_string($percentage).",
								weight = ".mysql_real_escape_string($weight)." ".
							"WHERE ID = 1";
				$res = mysql_query($sql, $connection);		
				//LED abloeschen
				echo shell_exec ('sudo /usr/bin/python /var/www/raspbi/python/led.py 1');
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
			$sql = "SELECT * FROM fill";
			$db_erg = mysql_query($sql, $connection);
			$res = mysql_fetch_row($db_erg);
			$percentage = $res[2];
			$weight = $res[1];
		}
			
	

?>
<h3 class = "title">Futterstand</h3>
<form action= "index.php?page=foodFill" method="post" enctype="multipart/form-data" name = "foodFill"> 
	<div class = "ui-field-contain">
		<label for="fill">F&uuml;llstand (%):</label>
		<input type="range" name="fill" id="fill" value="<?php echo $percentage;?>" min="0" max="100" />
	</div>
	<div class = "ui-field-contain">
		<label for="weight">Gewicht (g):</label>
		<input type="text" name= "weight" value = "<?php echo $weight;?>"/>
	</div>	
	<div class = "ui-field-contain">
		<input type="submit" data-inline="true" name = "submit" value="Speichern" >	
	</div>	
</form>

