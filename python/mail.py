import subprocess
import smtplib
import socket
import datetime
import sys
from email.mime.text import MIMEText

# Accountinformationen zum Senden der E-Mail

sender = 'raspberrypiffhs@gmail.com'
password = 'catdispenser'
smtpserver = smtplib.SMTP('smtp.gmail.com', 587)
smtpserver.ehlo()
smtpserver.starttls()
smtpserver.ehlo

def main(recipient):
	# In Account einloggen
	smtpserver.login(sender, password)

	# Aktuelles Datum holen
	Datum = datetime.date.today()	
	msg = MIMEText("Es ist nicht genuegend Futter im Futterautomat!")

	# Betreff + Datum
	msg['Subject'] = 'Nachricht vom Raspberry Pi - %s' % Datum.strftime('%b %d %Y')

	# Absender
	msg['From'] = sender

	#Empfaenger
	msg['To'] = recipient

	# E-Mail abschicken
	smtpserver.sendmail(sender, [recipient], msg.as_string())
	smtpserver.quit()
