from django.shortcuts import render
from django.shortcuts import HttpResponse

from .models import Question
from django.http import Http404
import requests
import psycopg2
import json

# Create your views here.
def index(request):
    return render(request,"index.html")

#投递记录
def jilu(request):
    conn = psycopg2.connect(database = 'fasldb',user = 'postgres',password = 'zzh390530',host = 'localhost',port = '5432')
    print("Opened database successfully")
    UserID = request.GET['UserID']
    cur = conn.cursor()
    cur.execute("SELECT job FROM jilu WHERE username = "+"'"+UserID+"'" )
    rows = cur.fetchall()
    #url = 'http://www.baidu.com'
    #userID = requests.get(url)
    json_list = []
    for row in rows:
        data = {}
        data['job'] = str(row[0])
        json_list.append(data)
    ret = json.dumps(json_list)
    return HttpResponse(ret)

#我的收藏
def mylike (request):
    conn = psycopg2.connect(database='fasldb', user='fasl', password='zzh390530', host='localhost', port='5432')
    print("Opened database successfully")
    UserID = request.GET['UserID']
    cur = conn.cursor()
    cur.execute("SELECT jobid FROM mylike WHERE userid ="+"'"+UserID+"'")
    rows = cur.fetchall()
    json_list = []
    for row in rows:
        print(row[0])
        data = {}
        data['job'] = str(row[0])
        json_list.append(data)
    ret = json.dumps(json_list)
    return  HttpResponse(ret)


#点击like
def like(request):
    UserID = request.GET['UserID']
    JobID = request.GET['JobID']
    conn = psycopg2.connect(database='fasldb', user='fasl', password='zzh390530', host='localhost', port='5432')
    print("Opened database successfully")
    cur = conn.cursor()
    cur.execute("INSERT INTO mylike (userid,jobid) VALUES("+"'"+UserID+"'" +','+"'"+JobID+"'"+")")
    conn.commit()#保存数据库修改
    return HttpResponse("success")

def dislike(request):
    UserID = request.GET['UserID']
    JobID = request.GET['JobID']
    conn = psycopg2.connect(database='fasldb', user='fasl', password='zzh390530', host='localhost', port='5432')
    print("Opened database successfully")
    cur = conn.cursor()
    cur.execute("DELETE FROM mylike  WHERE userid = "+"'"+UserID+"'"+" and "+"jobid = "+"'"+JobID+"'")
    conn.commit()#保存数据库修改
    return HttpResponse("success")

def calculate(request):
    formula = request.GET['formula']
    try:
        result = eval(formula, {})
    except:
        result = 'Error formula'
    return HttpResponse(result)

def job(request):
    conn = psycopg2.connect(database='fasldb', user='fasl', password='zzh390530', host='localhost', port='5432')
    print("Opened database successfully")
    cur = conn.cursor()
    cur.execute("SELECT jobid,name,company FROM job")
    rows = cur.fetchall()
    json_list = []
    for row in rows:
        print(row[0])
        data = {}
        data['jobid'] = str(row[0])
        data['jobname'] = str(row[1])
        data['company'] = str(row[2])
        json_list.append(data)
    ret = json.dumps(json_list)
    return HttpResponse(ret)
def search(request):
    conn = psycopg2.connect(database='fasldb', user='fasl', password='zzh390530', host='localhost', port='5432')
    print("Opened database successfully")
    text = request.GET['search']
    cur = conn.cursor()
    #cur.execute("SELECT jobid,name,company FROM job WHERE jobid like " + "'%" + text + "%'")
    cur.execute("SELECT jobid,name,company FROM job WHERE (jobid like "+"'%"+text+"%')"+"or (name like "+"'%"+text+"%')"+"or (company like "+"'%"+text+"%')")
    rows = cur.fetchall()
    json_list = []
    for row in rows:
        print(row[0])
        data = {}
        data['jobid'] = str(row[0])
        data['jobname'] = str(row[1])
        data['company'] = str(row[2])
        json_list.append(data)
    ret = json.dumps(json_list)
    return HttpResponse(ret)

def create(request):
    number = request.GET['number']
    name = request.GET['name']
    work = request.GET['work']
    conn = psycopg2.connect(database='fasldb', user='fasl', password='zzh390530', host='localhost', port='5432')
    print("Opened database successfully")
    cur = conn.cursor()
    cur.execute("INSERT INTO wechatuser (number,name ,work) VALUES("+"'"+number+"'" +','+"'"+name+"'"+','+"'"+work+"'"+")")
    conn.commit()#保存数据库修改
    return HttpResponse("success")