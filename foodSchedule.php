<!-- JS-Includes for timepicker -->
<script type="text/javascript" src="http://cdn.jtsage.com/external/jquery.mousewheel.min.js"></script>
<script type="text/javascript" src="http://dev.jtsage.com/jQM-DateBox/js/doc.js"></script>
<script type="text/javascript" src="http://cdn.jtsage.com/datebox/1.4.4/jqm-datebox-1.4.4.core.min.js"></script>
<script type="text/javascript" src="http://cdn.jtsage.com/datebox/1.4.4/jqm-datebox-1.4.4.mode.calbox.min.js"></script>
<script type="text/javascript" src="http://cdn.jtsage.com/datebox/1.4.4/jqm-datebox-1.4.4.mode.datebox.min.js"></script>
<script type="text/javascript" src="http://cdn.jtsage.com/datebox/1.4.4/jqm-datebox-1.4.4.mode.flipbox.min.js"></script>
<script type="text/javascript" src="http://cdn.jtsage.com/datebox/1.4.4/jqm-datebox-1.4.4.mode.slidebox.min.js"></script>
<script type="text/javascript" src="http://cdn.jtsage.com/datebox/1.4.4/jqm-datebox-1.4.4.mode.customflip.min.js"></script>
<script type="text/javascript" src="http://cdn.jtsage.com/datebox/i18n/jqm-datebox.lang.utf8.js"></script>
<script type="text/javascript">
jQuery.extend(jQuery.mobile,
{
  ajaxEnabled: false
});
</script>


<?php
		//Fehler-Array	
		$errors = array();
		$error = "";

		
		//Überprüfung ob Formular abgeschickt wurde
		if(isset($_POST['submit']) && $_POST['submit']=='Senden'){				

			$time = $_POST['time'];
			$amount = $_POST['amount'];			
			
			if(count($time) != count($amount))
			{
				$errors[] = "Sie haben nicht alle Felder ausgefuellt. Wenn eine Zeitangabe gemacht, muss auch die Menge angegeben werden und umgekehrt!";
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
				
				for($i = 0; $i < 10; $i++){
					
					$index = $i+1;
					if($time[$i] != ""){
						
						$inputtime = mysql_real_escape_string($time[$i]);
						$inputtime = $inputtime.":00";
						$sql = "UPDATE schedule set TIME = '".$inputtime."', ".
									"AMOUNT = ".mysql_real_escape_string($amount[$i]).", ".
									"ACTIVE = 1 ".
								"WHERE ID = ".$index;
					}
					else{
						$sql = "UPDATE schedule set TIME = '00:00:00', ".
									"AMOUNT = '0', ".
									"ACTIVE = 0 ".
								"WHERE ID = ".$index;
					}
					$res = mysql_query($sql, $connection);		
				}
			}
		}
		
		try{
			$db = new DBMySQL();
			$connection = $db->getConn();		
			$db->selectDB();
		}catch(Exception $e){
			echo  $e->getMessage();
		}	
		$sql = "SELECT * FROM schedule";
		$db_erg = mysql_query($sql, $connection);
	
			
	

?>
<h3 class = "title">Fuetterungszeiten einstellen</h3>			
<form action= "index.php?page=foodSchedule" method="post" enctype="multipart/form-data" name = "foodSchedule" > 		
	<table data-role="table" class="ui-responsive table-stroke">
		<thead>
			<tr>
				<th>Zeit</th>
				<th>Futtermenge</th>
			</tr>
		</thead>
		<tbody>	
			<?php
				while ($row = mysql_fetch_assoc($db_erg)) {	
					if($row['ACTIVE'] == 0){
						$time = "";
						$amount = "";
					}
					else{
						$time = substr($row['TIME'], 0, 5);
						$amount = $row['AMOUNT'];
					}
					echo "<tr>\n";
					echo "\t<td><input type='text' name='time[]'  value = '".$time."' data-role=\"datebox\" data-options='{\"mode\":\"timeflipbox\", \"overrideTimeOutput\":\"%k:%M\", \"overrideTimeFormat\":12}' /></td>\n";					
					echo "\t<td><input type='text' name='amount[]' value = '".$amount."' ></td>\n";
					echo "\t</tr>\n";
				}					
			?>		
			<tr><td colspan= "2"><input type="submit" name="submit" value="Senden"></td></tr>
		</tbody>
	</table>	
	
   
</div>
</form>