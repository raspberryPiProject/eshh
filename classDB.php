<?php
 
 /* Klasse für Datenbankabfragen*/
class DBMySQL {

  private $connection = NULL;
 
  private $dbconfig = array(
			'server' => 'localhost',
			'user' => 'root',
			'password' => '',
			'database' => 'fooddispenser',
			);
 
 //connect to DB
  public function __construct(){
	
	$this->connection = @mysql_connect($this->dbconfig['server'],
                                      $this->dbconfig['user'],
                                      $this->dbconfig['password'],
                                      TRUE) or $this->throw_ex("beim Verbinden zur Datenbank ist ein 
									  Fehler aufgetreten, bitte versuchen Sie es später nochmals");						  
									  
  	mysql_query("SET NAMES 'utf8'", $this->connection);
  }
 
 //Exception-Funktion
  private function throw_ex($er){
	throw new Exception($er);
  }
 
 //get Connection
  public function getConn() {
  	return $this->connection;
  }
 
 
  
  public function selectDB(){	
	mysql_select_db($this->dbconfig['database'], $this->connection) OR $this->throw_ex("beim Verbinden zur Datenbank ist ein Fehler aufgetreten, bitte versuchen Sie es später nochmals"); 
  }
  
}
 
?>