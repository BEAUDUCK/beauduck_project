from flask import Flask, request
from flask_cors import CORS
from PIL import Image

import numpy as np
import face_recognition
import os
import ssl
import io


# DB
import pymysql

# 이미지 읽기
import cv2
import requests

#벡터를 문자열로 변환
import base64

app = Flask(__name__)
CORS(app)


def getEmps(memberId): #imgai 테이블에서 메이크업이 있는 멤버만 뽑아오기(얘네로 거리 돌리기)
    ret = []
    db = pymysql.connect(host='i8b306.p.ssafy.io', user='root', db='common_pjt', password='1234', charset='utf8')
    curs = db.cursor()
    sql = "select member_id, img from imgai where is_makeup=true or member_id =%s"
    curs.execute(sql,[memberId])
    rows = curs.fetchall()
    for e in rows: 
        ret.append({"member_id" : e[0], "img" : e[1]})
    db.commit()
    db.close()
    return ret

# v2 => 이미지  불러오고 변환하기
def get_cropped_face(image_file):
    image_file = image_file[23:] #data:image/jpeg;base64, 잘라내기
    imgdata  = base64.b64decode(image_file)
    dataBytesIO  = io.BytesIO(imgdata)
    image = Image.open(dataBytesIO)
    image_nparray = np.array(image)
    face_locations = face_recognition.face_locations(image_nparray)   # 얼굴 영역 박스   
    a, b, c, d = face_locations[0]     # 얼굴 영역 박스 좌표
    cropped_face = image_nparray[a:c,d:b,:]    # 얼굴 영역 박스 좌표를 이용해 얼굴 잘라내기 
    return cropped_face # 이미지 파일


def get_face_embedding(face):
    return face_recognition.face_encodings(face)

def get_face_embedding_dict(memberId, url):
    try: 
        face = get_cropped_face(url)    # 얼굴 영역만 자른 이미지
    except:                    
        return {memberId: "Cannot recognize image"}
        # 인식하지 못하는 이미지는 error 리턴

    embedding = get_face_embedding(face)   # 얼굴 영역에서 얼굴 임베딩 벡터를 추출

    if len(embedding) <= 0:   # 얼굴 영역이 제대로 detect되지 않았을 경우를 대비
        return {memberId: "Cannot recognize image"}
    
    return embedding[0] #임베딩한 값 리턴


embedding_dict = {}

# 거리순 비교하는 것
def get_distance(name1, name2):
    return np.linalg.norm(embedding_dict[name1]-embedding_dict[name2], ord=2)

def get_sort_key_func(name1):         # name1은 미리 지정
    def get_distance_from_name1(name2):      # name2는 호출시에 인자로 받는다.
        return get_distance(name1, name2)
    return get_distance_from_name1


def get_nearest_face(name, top= 5): #거리 비슷한 5개 추출
    sort_key_func = get_sort_key_func(name)  

    sorted_faces = sorted(embedding_dict.items(), key=lambda x:sort_key_func(x[0]))   # 얼굴 임베딩 딕셔너리를 오름차순으로 정렬
    arr = ['0']*6
    
    for i in range(top + 1):
          if sorted_faces[i]:
                if (sorted_faces[i][0] == name):
                    continue
                arr[i] = {
                    "rank" : i,
                    "name" : sorted_faces[i][0],
                    "dis" : sort_key_func(sorted_faces[i][0])
                }
    return arr



def getmakeup(memberId): # 메이크업 테이블에서 멤버 아이디로 해당 멤버의 메이크업 뽑아오기
    db = pymysql.connect(host='i8b306.p.ssafy.io', user='root', db='common_pjt', password='1234', charset='utf8')
    curs = db.cursor()
    sql = "select  m.member_id, m.title, m.content, m.img, m.duration, m.score, m.count from makeup m  "
    sql = sql + "join imgai i " 
    sql = sql + "on m.member_id = i.member_id "
    sql = sql + "where m.member_id =%s and i.is_makeup = true "
    sql = sql + "ORDER BY m.count and m.score DESC limit 1"
    
    curs.execute(sql,[memberId])
    
    rows = curs.fetchall()
    temp = {}
    for e in rows:
        temp = {
                'member_id':e[0] ,
                'title' : e[1], 
                'content' : e[2], 
                'img' : e[3], 
                'duration' : e[4],
                'score': e[5],
                'count' : e[6]
                }
    db.commit()
    db.close()
    return temp

# DB 쿼리문들
def getisMember(memberId): #imgai에서 멤버 아이디 뽑아오기 -> 얼굴 등록되어 있는지 확인
    ret = []
    db = pymysql.connect(host='i8b306.p.ssafy.io', user='root', db='common_pjt', password='1234', charset='utf8')
    curs = db.cursor()
    sql = "select member_id from imgai where member_id =%s "
    curs.execute(sql,[memberId])
    rows = curs.fetchall()
    for e in rows:
        ret.append(e[0])
    db.commit()
    db.close()
    return ret

def insertgetmakeup(memberId):
    db = pymysql.connect(host='i8b306.p.ssafy.io', user='root', db='common_pjt', password='1234', charset='utf8')
    curs = db.cursor()
    sql = "select member_id from makeup where member_id =%s "
    curs.execute(sql,[memberId])
    rows = curs.fetchall()
    temp = {}
    for e in rows:
        temp = {'member_id':e[0]}
    db.commit()
    db.close()
    return temp

def set_embedding_to_DB(memberId, embedding, is_makeup):
    db = pymysql.connect(host='i8b306.p.ssafy.io', user='root', db='common_pjt', password='1234', charset='utf8')
    curs = db.cursor()
    sql = "insert into imgai (member_id, img, is_makeup) values(%s, %s, %s)"
    curs.execute(sql,(memberId, embedding, is_makeup))
    db.commit()
    db.close()

def update_embedding_to_DB(memberId, embedding):
    db = pymysql.connect(host='i8b306.p.ssafy.io', user='root', db='common_pjt', password='1234', charset='utf8')
    curs = db.cursor()
    sql = "UPDATE imgai SET img = %s WHERE member_id = %s;"
    curs.execute(sql,(embedding, memberId))
    db.commit()
    db.close()

@app.route('/save', methods=['POST'])
def save():

    memberId = request.get_json()["memberId"]
    url = request.get_json()["img"]

    #d얼굴 사진으로 임베딩 벡터 추출하기
    embedding = get_face_embedding_dict(memberId,url)

    if (type(embedding) is dict) or (embedding == "Cannot recognize image"):
        return {"answer": "Try Again"}
    #임베딩 벡터 인코딩하기 + 문자열로 변환
    random_vector = np.float32(embedding)
    vector = random_vector.tobytes() 
    vector_tostring = base64.b85encode(vector).decode()

    # 만약 이미 등록이 된 테이블이면 바꾸기
    if (getisMember(memberId) == []): # 회원이 없을 경우
        #문자열로 바꾼 벡터값 imgai 테이블에 저장
        if (insertgetmakeup(memberId) == {}): # 화장법 등록 여부 판단
            set_embedding_to_DB(memberId, vector_tostring, False) # 만약 화장법 등록 안했으면 false로
        else:
            set_embedding_to_DB(memberId, vector_tostring, True) # 만약 화장법 등록 했으면 false로
    else: # 회원이 있을 경우
        update_embedding_to_DB(memberId, vector_tostring)

    return {'answer': "DB success"}


@app.route('/recommand', methods=['POST'])
def recommand():

    memberId = request.get_json()["id"]

    #imgai 테이블에서 memberid랑 img url 긁어와야 함 - makeup있는 애들만
    file_list = getEmps(memberId)  
    #file_list에 있는 값들 embedding_dict에 디코딩해서 넣어야 함
    global embedding_dict
    for file in file_list: 
        #디코딩
        v_decode = base64.b85decode(file["img"]) 
        original_v = np.frombuffer(v_decode, dtype=np.float32) 

        #embedding_dict에 넣기
        embedding_dict[file["member_id"]] = original_v


    #가까운 얼굴 찾기
    ans = get_nearest_face(memberId)              

    result = []
    for arr in ans:
        if type(arr) is str : continue 
        ret = getmakeup(arr["name"])
        if (ret) : 
            result.append(ret)
        
    return {'answer': result}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, ssl_context =("cert.pem", "privkey.pem"))
