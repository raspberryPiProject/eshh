
<?php
	
	

		//Fehler-Array	
		$errors = array();
		$error = "";

		
		//Überprüfung ob Formular abgeschickt wurde
		if(isset($_POST['submit']) && $_POST['submit']=='Speichern'){				

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
				
				
				$crontab = new CrontabManager();
				$id = 1;
				
				for($i = 0; $i < 10; $i++){
					/*** Cron-Job-Mutation ***/
					//alter Zeitplan aus DB holen
					$sql = "SELECT * from schedule WHERE ID = ".$id;					
					$res = mysql_query($sql, $connection);								
					$row = mysql_fetch_assoc($res);		
					$id++;
					//Falls Job vorher aktiv...					
					if($row['ACTIVE'] == 1){							
						//...Job loeschen
						$cronDel = new CrontabManager();
						$cronDel->deleteJob($row['CRONJOBID']);
						$cronDel->save(false);
					}
					//Falls Zeit an Index $i erfasst wurde
					if($time[$i] != ""){							
						/*****neuer Job einfügen ****/						
						//Zeit in min und h aufteilen
						$times = explode(":", $time[$i]);
						$minute = substr($times[1], 0,1) == 0 ? substr($times[1], 1,1) : $times[1];
						$hour = substr($times[0], 0,1) == 0 ? substr($times[0], 1,1) : $times[0];
						$job = $crontab->newJob();
						$job->on($minute.' '.$hour.' * * *');		
						$job->doJob("sudo /usr/bin/python /var/www/raspbi/python/stepper.py ".$row["ID"]." 0");	
				
						//Job-ID zwischenspeichern
						$jobDetails = explode("#", $job);
						$jobID = trim($jobDetails[1]);
						$crontab->add($job);					
						
						
					}
									
										
					/*** Datenbank updaten***/
					$index = $i+1;
					if($time[$i] != ""){
						$inputtime = mysql_real_escape_string($time[$i]);
						$inputtime = $inputtime.":00";
						$sql = "UPDATE schedule set TIME = '".$inputtime."', ".
									"AMOUNT = ".mysql_real_escape_string($amount[$i]).", ".
									"ACTIVE = 1, ".
									"CRONJOBID = '".$jobID."' ".
								"WHERE ID = ".$index;
					}
					else{
						$sql = "UPDATE schedule set TIME = '00:00:00', ".
									"AMOUNT = '0', ".
									"ACTIVE = 0 ,".
									"CRONJOBID = ''".
								"WHERE ID = ".$index;
					}
					$res = mysql_query($sql, $connection);		
				}	
				
				$crontab->save();
				
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
<form data-ajax="false" action= "index.php?page=foodSchedule" method="post" enctype="multipart/form-data" name = "foodSchedule"> 		
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
					//echo "\t<td><input type='text' name='time[]'  value = '".$time."'/></td>\n";							
					echo "\t<td><input type='text' name='amount[]' value = '".$amount."' ></td>\n";
					echo "\t</tr>\n";
				}					
			?>		
			<tr><td colspan= "2"><input type="submit" name="submit" value="Speichern"></td></tr>
		</tbody>
	</table>	
	
   
</div>
</form>