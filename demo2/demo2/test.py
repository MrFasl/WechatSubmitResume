import psycopg2
from django.db import connection
from django.conf import settings

settings.configure()
conn = psycopg2.connect(database="fasldb", user="fasl", password="zzh390530", host="localhost", port="5432")
cur = conn.cursor()
#cur.execute("CREATE TABLE UserInfo"
 #           "(UserID CHAR(20) PRIMARY KEY  NOT NULL ,"
  #          "Phone CHAR(12) NOT NULL ,"
   #         "Name CHAR(20) NOT NULL,"
    #        "Age INT NOT NULL ,"
     #       "Major CHAR(15),"
      #      "School CHAR(20)"
       #     ");")
#cur.execute("CREATE TABLE Job"
#            "(JobID CHAR(20) PRIMARY KEY  NOT NULL ,"
#            "Name CHAR(20) NOT NULL,"
#            "JobEmail CHAR(20),"
#            "Company CHAR(20),"
#            "Description CHAR(200) "
#            ")")
cur.execute("CREATE TABLE IF NOT EXISTS wechatuser"
            "(ID SERIAL NOT NULL  ,"
            "name  CHAR(20) NOT NULL ,"
            "number CHAR(20) NOT NULL,"
            "work text "
            ")")
conn.commit()




print ("Opened database successfully")