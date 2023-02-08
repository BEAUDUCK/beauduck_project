from flask import Flask, request
from flask_cors import CORS

import numpy as np
import face_recognition
import os


# DB
import pymysql

# 이미지 읽기
import cv2
import requests

app = Flask(__name__)
CORS(app)

## 저장된 db에 url 가져오기
def getEmps():
    ret = []
    db = pymysql.connect(host='3.38.169.2', user='root', db='common_pjt', password='1234', charset='utf8')
    curs = db.cursor()
    sql = "select member_id, img from imgai"
    curs.execute(sql)
    rows = curs.fetchall()
    for e in rows:
        ret.append({"member_id" : e[0], "img" : e[1]})
    db.commit()
    db.close()
    return ret

##### 여기가 이미지 불러오고 하는 곳
dir_path = './img/'

# v2 => 이미지  불러오고 변환하기
def get_cropped_face(image_file):
    image_nparray = np.asarray(bytearray(requests.get(image_file).content), dtype=np.uint8)
    image = cv2.imdecode(image_nparray, cv2.IMREAD_COLOR) 
    face_locations = face_recognition.face_locations(image)   # 얼굴 영역 박스 
    a, b, c, d = face_locations[0]     # 얼굴 영역 박스 좌표
    cropped_face = image[a:c,d:b,:]    # 얼굴 영역 박스 좌표를 이용해 얼굴 잘라내기 
    return cropped_face # 이미지 파일

dir_path = './img/'

def get_face_embedding(face):
    return face_recognition.face_encodings(face)

def get_face_embedding_dict(dir_path):

    # DB에서 가져온 코드
    file_list = getEmps()
    
    embedding_dict = {}
    
    for file in file_list:     
        try: 
            face = get_cropped_face(file["img"])    # 얼굴 영역만 자른 이미지
        except:                                  # 인식하지 못하는 이미지는 넘어감
            continue    
        embedding = get_face_embedding(face)   # 얼굴 영역에서 얼굴 임베딩 벡터를 추출
        if len(embedding) > 0:   # 얼굴 영역이 제대로 detect되지 않았을 경우를 대비
                embedding_dict[file["member_id"]] = embedding[0]
    return embedding_dict

embedding_dict = get_face_embedding_dict(dir_path)

# 거리순 비교하는 것
def get_distance(name1, name2):
    return np.linalg.norm(embedding_dict[name1]-embedding_dict[name2], ord=2)

def get_sort_key_func(name1):         # name1은 미리 지정
    def get_distance_from_name1(name2):      # name2는 호출시에 인자로 받는다.
        return get_distance(name1, name2)
    return get_distance_from_name1


def get_nearest_face(name, top= 5):
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



def getmakeup(meberId):
    db = pymysql.connect(host='3.38.169.2', user='root', db='common_pjt', password='1234', charset='utf8')
    curs = db.cursor()
    sql = "select  m.member_id, m.title, content, m.img, m.duration, m.score, m.count from makeup m  "
    sql = sql + "join imgai i " 
    sql = sql + "on m.member_id = i.member_id "
    sql = sql + "where m.member_id =%s and i.is_makeup = true "
    sql = sql + "ORDER BY m.count and m.score DESC limit 1"
    
    curs.execute(sql,[meberId])
    
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

@app.route('/recommand', methods=['POST'])
def ajax():
    ans = get_nearest_face(request.get_json()["id"])
    result = []
    for arr in ans:
        if type(arr) is str : continue 
        ret = getmakeup(arr["name"])
        if (ret) : 
            result.append(ret)
    return {'answer': result}
    

if __name__ == '__main__':
    app.run()

if __name__ == '__main__':
    app.run(host='i8b306.p.ssafy.io', port=5000, threaded=False)


# if __name__ == '__main__':
#     app.run(host='localhost', port=5000, threaded=False)