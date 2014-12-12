<h3 class = "title">Datum f&uuml;r Bewegungsstatistik w&auml;hlen</h3>
<form action= "movementStatistic.php" target="_blank" method="post" enctype="multipart/form-data" name = "pickDate"> 
	<div class="ui-field-contain">
		<label for="mode1">Datum</label>
		<input name="datePick" type="text" data-role="datebox" data-options='{"mode":"calbox", "calStartDay": 1}' value = "<?php echo date("d.m.Y");?>" />
		<!--<input name="date" type="text">-->
	</div>
	<input type="submit" name="submit" value="Senden">
</form>