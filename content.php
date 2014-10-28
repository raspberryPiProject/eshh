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
	case 'movementDetection':
		include('movementDetection.php');
	break;
	case 'datePicker':
		include('datePicker.php');
	break;
	default:
		include('home.php');
	break;
 }
?>