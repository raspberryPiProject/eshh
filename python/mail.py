import subprocess
import smtplib
import socket
import datetime
import sys
from email.mime.text import MIMEText

# Accountinformationen zum Senden der E-Mail
Empfaenger = 'raspberrypiffhs@gmail.com'
Absender = 'raspberrypiffhs@gmail.com'
Passwort = 'catdispenser'
smtpserver = smtplib.SMTP('smtp.gmail.com', 587)
smtpserver.ehlo()
smtpserver.starttls()
smtpserver.ehlo

def main():
	# In Account einloggen
	smtpserver.login(Absender, Passwort)

	# Aktuelles Datum holen
	Datum = datetime.date.today()	
	msg = MIMEText("Es ist nicht genuegend Futter im Futterautomat!")

	# Betreff + Datum
	msg['Subject'] = 'Nachricht vom Raspberry Pi - %s' % Datum.strftime('%b %d %Y')

	# Absender
	msg['From'] = Absender

	#Empfaenger
	msg['To'] = Empfaenger

	# E-Mail abschicken
	smtpserver.sendmail(Absender, [Empfaenger], msg.as_string())
	smtpserver.quit()
