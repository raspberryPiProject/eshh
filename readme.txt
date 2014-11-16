1. Lighttpd, PHP und Mysql installieren
http://www.gtkdb.de/index_36_2452.html


2. Berechtigung fuer www-Verzeichnis
a) “www-data” user und group owner von /var/www Verzeichnis machen:

sudo chown www-data:www-data /var/www

b) “www-data” Gruppe Schreibrechnte auf Verzeichnis var/www erteilen

sudo chmod 775 /var/www

c) pi-User zur www-data Gruppe hinzufuegen: 

sudo usermod -a -G www-data pi



3. Berechtigungen zur Ausfuehrung von Python-Scripts durch Webserver setzen:

Öffnen des sudoers-File in Editor: sudo nano /etc/sudoers

Dann in die Datei zuunterst:    www-data ALL=(ALL) NOPASSWD: ALL

hinzufuegen
