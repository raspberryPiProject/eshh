<style id="collapsible-list-item-style">
/* Basic settings */
.ui-li-static.ui-collapsible {
padding: 0;
}
.ui-li-static.ui-collapsible > .ui-collapsible-content > .ui-listview,
.ui-li-static.ui-collapsible > .ui-collapsible-heading {
margin: 0;
}
.ui-li-static.ui-collapsible > .ui-collapsible-content {
padding-top: 0;
padding-bottom: 0;
padding-right: 0;
border-bottom-width: 0;
}
/* collapse vertical borders */
.ui-li-static.ui-collapsible > .ui-collapsible-content > .ui-listview > li.ui-last-child,
.ui-li-static.ui-collapsible.ui-collapsible-collapsed > .ui-collapsible-heading > a.ui-btn {
border-bottom-width: 0;
}
.ui-li-static.ui-collapsible > .ui-collapsible-content > .ui-listview > li.ui-first-child,
.ui-li-static.ui-collapsible > .ui-collapsible-content > .ui-listview > li.ui-first-child > a.ui-btn,
.ui-li-static.ui-collapsible > .ui-collapsible-heading > a.ui-btn {
border-top-width: 0;
}
/* Remove right borders */
.ui-li-static.ui-collapsible > .ui-collapsible-heading > a.ui-btn,
.ui-li-static.ui-collapsible > .ui-collapsible-content > .ui-listview > .ui-li-static,
.ui-li-static.ui-collapsible > .ui-collapsible-content > .ui-listview > li > a.ui-btn,
.ui-li-static.ui-collapsible > .ui-collapsible-content {
border-right-width: 0;
}
/* Remove left borders */
/* Here, we need class ui-listview-outer to identify the outermost listview */
.ui-listview-outer > .ui-li-static.ui-collapsible .ui-li-static.ui-collapsible.ui-collapsible,
.ui-listview-outer > .ui-li-static.ui-collapsible > .ui-collapsible-heading > a.ui-btn,
.ui-li-static.ui-collapsible > .ui-collapsible-content {
border-left-width: 0;
}
</style>

<ul data-role="listview" class="ui-listview-outer" data-inset="true">
  <div data-role="collapsible" data-iconpos="left" data-shadow="false" data-corners="false" data-collapsed-icon="gear" data-expanded-icon="gear">
    <h2>Einstellungen<span class="ui-li-count">4</span></h2>
    <ul data-role="listview" data-shadow="false" data-inset="true" data-corners="false">		
		<li><a href="index.php?page=foodSchedule" class="ui-btn ui-icon-clock ui-btn-icon-left">F&uuml;tterungszeitplan</a></li>
		<li><a href="index.php?page=foodAmount" data-role="button" data-icon="dashboard">Einheit Futterausgabe</a></li>
		<li><a href="index.php?page=foodFill" data-role="button" data-icon="bitbucket">Futterstand</a></li>
		<li><a href="index.php?page=settings" data-role="button" data-icon="gears">allgemeine Einstellungen</a></li>
    </ul>
  </div>
  <div data-role="collapsible" data-iconpos="left" data-shadow="false" data-corners="false" data-collapsed-icon="eye" data-expanded-icon="eye">
    <h2>Bewegungsmelder<span class="ui-li-count">3</span></h2>
    <ul data-role="listview" data-shadow="false" data-inset="true" data-corners="false">		
		<li><a href="index.php?page=movementStart" data-role="button" data-icon="camera">Bewegungsmelder starten</a></li>
		<li><a href="index.php?page=movementStop" data-role="button" data-icon="power-off" data-ajax="false">Bewegungsmelder stoppen</a></li>
		<li><a href="index.php?page=datePicker" data-role="button" data-icon="bar-chart-o">Statistik Bewegungsmelder</a></li>
    </ul>
  </div>  
  <li><a href="#"  onclick="callScript()" data-role="button" data-icon="eject" >Direkt-Futterausgabe</a></li>
  <li><a href="index.php?page=help" class="ui-btn ui-icon-info ui-btn-icon-left">Hilfe</a></li>  
</ul>
<?php include("foodStatus.php");?>		
       
