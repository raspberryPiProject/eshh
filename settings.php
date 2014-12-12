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
				//Insert von Studio-Inhaber
				$sql = "UPDATE fill set percentage = ".mysql_real_escape_string($percentage).",
								weight = ".mysql_real_escape_string($weight)." ".
							"WHERE ID = 1";
				$res = mysql_query($sql, $connection);		
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
			$sql = "SELECT * FROM settings";
			$db_erg = mysql_query($sql, $connection);
		}
			
	

?>
<h3 class = "title">Einstellungen</h3>
<form action= "index.php?page=foodFill" method="post" enctype="multipart/form-data" name = "foodFill"> 	
	<table data-role="table" class="ui-responsive table-stroke">
		<thead>
		   <tr>
			 <th>Einstellung</th>
			 <th>Wert</th>
		   </tr>
		</thead>
		<tbody>
	<?php
		$i = 1;
		while ($row = mysql_fetch_assoc($db_erg)) {	
			echo "<tr>\n";
			echo "\t<td>\n";
			echo "\t\t<input type='text' name='name".$i."' value='".$row["NAME"]."'>\n";
			echo "\t</td>\n";
			echo "\t<td>\n";
			echo "\t\t<input type='text' name='setting".$i."' value='".$row["SETTING"]."'>\n";
			echo "\t</td>\n";
			echo "</tr>\n";
			$i++;
		}
	?>	
		<tr>
			<td colspan = "2"><input type="submit" data-inline="true" name = "submit" value="Speichern" >	</td>
		</tr>
		</tbody>
	</table>
</form>


