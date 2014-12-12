import RPi.GPIO as GPIO 
import sys

GPIO.setmode(GPIO.BOARD) 
ledPin = 10
GPIO.setup(ledPin, GPIO.OUT) 

if(sys.argv[1]):
	GPIO.output(ledPin, int(sys.argv[1]))

	
