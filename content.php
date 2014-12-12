<?php
 //Handelt Inhalts-Seiten
 switch($page)
 {
	case 'home':
		include('home.php');
	break;
	case 'foodAmount':
		include('foodAmount.php');
	break;
	case 'foodSchedule':
		include('foodSchedule.php');
	break;
	case 'foodFill':
		include('foodFill.php');
	break;
	case 'settings':
		include('settings.php');
	break;
	case 'foodDirect':
		include('foodDirect.php');
	break;
	case 'movementStart':
		include('movementStart.php');
	break;
	case 'movementStop':
		include('movementStop.php');
	break;
	case 'movementValue':
		include('movementValue.php');
	break;
	case 'datePicker':
		include('datePicker.php');
	break;
	case 'help':
		include('help.php');
	break;
	default:
		include('home.php');
	break;
 }
?>