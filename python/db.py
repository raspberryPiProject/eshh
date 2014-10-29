#!/usr/bin/python
# -*- coding: utf-8 -*-

import MySQLdb as mdb


con = mdb.connect('localhost', 'root', '', 'fooddispenser')
with con:
	cur = con.cursor()
	cur.execute("SELECT * FROM movement")

	rows = cur.fetchall()

	for row in rows:
		print(row["ID"], row["DATE"])

	cur.execute("INSERT INTO movement (DATE, TIME) VALUES('2014-10-28', '07:00:00')")	
