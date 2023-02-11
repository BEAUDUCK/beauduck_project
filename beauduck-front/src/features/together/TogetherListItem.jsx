import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import face1 from "../../assets/faces/face1.png"
import face2 from "../../assets/faces/face2.png"
import face3 from "../../assets/faces/face3.png"
import face4 from "../../assets/faces/face4.png"
import face5 from "../../assets/faces/face5.png"
import face6 from "../../assets/faces/face6.png"
import face7 from "../../assets/faces/face7.png"
import face8 from "../../assets/faces/face8.png"


const TogetherListItem = ({ room }) => {
  
  const dispatch = useDispatch()
  const [nowColor, setNowColor] = useState("")
  const [nowFace, setNowFace] = useState("")
  const [nowNum, setNowNum] = useState(_.random(0, 7))
<<<<<<< HEAD
  const navigate = useNavigate
=======

  
>>>>>>> 60aa0036b5482679139d2924793a5c6d7acec44b
  
  useEffect(() => {
    randomFace()
  }, [])
  
  
  const faces = [
    face1, face2, face3, face4,
    face5, face6, face7, face8
  ]
  
  const colors = [
    "#EE5F5B", "#F6A95B", "#F5DE5E", "#3264C3",
    "#7E9CC2", "#B8DE6F", "#DAB801", "#018699"
  ]
  
  const randomFace = () => {
    setNowFace(faces[nowNum])
    setNowColor(colors[nowNum])
  }

  const isOpenClick = () => {

  }

  return (
    <div className="flip">  
      <div className="card" onClick={isOpenClick} >
        <div className="front">
          <div 
            className="front-top"
            style={{ backgroundColor: nowColor }}
          >
            <img src={nowFace} />
          </div>
          <div className="front-bottom">
            {room.title}
          </div>
        </div>
        <div 
          className="back"
          style={{ backgroundColor: nowColor }}
        >
          <div className="back-content">
            <div className="back-content-index">방장</div>
            <div className="back-content-context">{room.host}</div>
          </div>
          {/* <div className="back-content">
            <div className="back-content-index">제목</div>
            <div className="back-content-context">{consultingItem.title}</div>
          </div> */}
          <div className="back-content">
            <div className="back-content-index">내용</div>
            <div className="back-content-context">{room.text}</div>
          </div>
          <div className="back-content"> 
            <div className="back-content-index">인원</div>
            {/* <div>{consultingItem.people}</div> 사람 수 들어가야 함  */}
            <div className="back-content-context">4/5</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default TogetherListItem;
