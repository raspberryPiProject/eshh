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
		<li><a href="index.php?page=foodAmount" class="ui-btn ui-icon-cloud ui-btn-icon-left">Futtermenge</a></li>
		<li><a href="index.php?page=foodSchedule" class="ui-btn ui-icon-clock ui-btn-icon-left">Fuetterungszeiten</a></li>
		<li><a href="index.php?page=foodFill" class="ui-btn ui-icon-eye ui-btn-icon-left">Futterstandanzeige</a></li>
		<li><a href="index.php?page=settings" class="ui-btn ui-icon-star ui-btn-icon-left">allgemeine Einstellungen</a></li>
    </ul>
  </div>
  <li><a href="index.php?page=movementDetection" class="ui-btn ui-icon-video ui-btn-icon-left">Bewegungsmelder</a></li>
  <li><a href="index.php?page=foodDirect" class="ui-btn ui-icon-navigation ui-btn-icon-left">Futterausgabe</a></li>
  <li><a href="#" class="ui-btn ui-icon-info ui-btn-icon-left">Hilfe</a></li>  
</ul>

<?php include("foodStatus.php");?>		
       
