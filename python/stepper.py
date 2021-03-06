#!/usr/bin/python

from time import *
import RPi.GPIO as GPIO
import MySQLdb as mdb
import mail
import sys

GPIO.setmode(GPIO.BCM)

# Verwendete Pins am Rapberry Pi
A=18
B=23
C=24
D=25
time = 0.005

#Argumente speichern
jobid = sys.argv[1]
directFeed = int(sys.argv[2])

# Pins aus Ausgaenge definieren
GPIO.setup(A,GPIO.OUT)
GPIO.setup(B,GPIO.OUT)
GPIO.setup(C,GPIO.OUT)
GPIO.setup(D,GPIO.OUT)
GPIO.output(A, False)
GPIO.output(B, False)
GPIO.output(C, False)
GPIO.output(D, False)
	
# Schritte 1 - 8 festlegen
def Step1():
    GPIO.output(D, True)
    sleep (time)
    GPIO.output(D, False)

def Step2():
    GPIO.output(D, True)
    GPIO.output(C, True)
    sleep (time)
    GPIO.output(D, False)
    GPIO.output(C, False)

def Step3():
    GPIO.output(C, True)
    sleep (time)
    GPIO.output(C, False)

def Step4():
    GPIO.output(B, True)
    GPIO.output(C, True)
    sleep (time)
    GPIO.output(B, False)
    GPIO.output(C, False)

def Step5():
    GPIO.output(B, True)
    sleep (time)
    GPIO.output(B, False)

def Step6():
    GPIO.output(A, True)
    GPIO.output(B, True)
    sleep (time)
    GPIO.output(A, False)
    GPIO.output(B, False)

def Step7():
    GPIO.output(A, True)
    sleep (time)
    GPIO.output(A, False)

def Step8():
    GPIO.output(D, True)
    GPIO.output(A, True)
    sleep (time)
    GPIO.output(D, False)
    GPIO.output(A, False)

def switchLED(mode):
	GPIO.setmode(GPIO.BOARD) 
	ledPin = 10
	GPIO.setup(ledPin, GPIO.OUT) 
	GPIO.output(ledPin, int(mode))
	
# DB-Connect
con = mdb.connect('localhost', 'root', 'catdispenser', 'fooddispenser')
with con:
	cur = con.cursor()	
	
	#Futterstand ermitteln
	cur.execute("SELECT WEIGHT, PERCENTAGE FROM fill")		
	rowFill = cur.fetchone()
	fill = rowFill[0]
	percentage = rowFill[1]
	if(directFeed == 0):
		#auszugebende Futtermenge ermitteln
		cur.execute("SELECT AMOUNT FROM schedule WHERE ID = '" + str(jobid) + "'")
		rowWeight = cur.fetchone()
		weight = rowWeight[0]
	#Umdrehung/Gewichtseinheit holen
	cur.execute("SELECT * FROM amount")
	rowTurn = cur.fetchone()
	turn = rowTurn[1]
	weightTurn = rowTurn[2]		
	
	#Rest-Gewicht berechnen
	if(directFeed == 1):
		restWeight = fill - weightTurn
	else:
		restWeight = fill - weight
		
	turnToDo = 0
	
	#Falls Restgewicht groesser 0
	if (restWeight > 0):
		#Umdrehung
		if(directFeed == 1):
			turnToDo = turn
		else:
			#Umdrehungszahl mit Verhaeltnis Umdrehung/Gewichtseinheit berechnen
			turnToDo = (turn/weightTurn) * weight
		#Futterstand in % berechnen	
		newPercentage = percentage / fill * restWeight
		#Futterstand updaten
		cur.execute("UPDATE fill SET WEIGHT = " + str(restWeight) + ", PERCENTAGE = " + str(newPercentage))
		#Umdrehung berechnen	
		effectiveTurn = int(512 * turnToDo)

		# Volle Umdrehung    
		for i in range (effectiveTurn):    
			Step1()
			Step2()
			Step3()
			Step4()
			Step5()
			Step6()
			Step7()
			Step8()  
			
		GPIO.cleanup()
	#nicht genuegend Futter vorhanden: Stoerung!	
	else:	
		cur.execute("SELECT SETTING from settings WHERE NAME = 'Email-Notification'")
		rowMail = cur.fetchone()
		#Email-Notifikation
		mail.main(rowMail[0])
		
		# Aktuelles Datum /Zeit berechnen	
		datum = strftime("%Y-%m-%d", localtime())
		zeit = strftime("%H:%M", localtime())
		#Eintrag in Log-Tabelle
		cur.execute("INSERT INTO log (DATE, TIME, ERROR) VALUES('" + datum + "', '" + zeit + "', 'Not enough food')")		
		#LED anzuenden
		switchLED(0)
		




	

