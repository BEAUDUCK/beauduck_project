import { useEffect } from "react";
import _ from "lodash"
import { useState } from "react";
import face1 from "../../assets/faces/face1.png"
import face2 from "../../assets/faces/face2.png"
import face3 from "../../assets/faces/face3.png"
import face4 from "../../assets/faces/face4.png"
import face5 from "../../assets/faces/face5.png"
import face6 from "../../assets/faces/face6.png"
import face7 from "../../assets/faces/face7.png"
import face8 from "../../assets/faces/face8.png"


const ConsultingListItem = ({ consultingItem }) => {

  // return (
  //   <div className='consulting-list-item'>
  //     <div className="consulting-list-item-child">
  //       <div className='consulting-list-item-color'>
  //         color
  //       </div>
  //       <div className='consulting-list-item-title'>
  //         { consultingItem.title }
  //       </div>
  //     </div>
  //     <div className="consulting-list-item-child back">
  //       <div className='consulting-list-item-color'>
  //         color
  //       </div>
  //       <div className='consulting-list-item-title'>
  //         { consultingItem.title }
  //       </div>
  //     </div>
  //   </div>
  // )
  // const colors = [
  //   "#5B9F57", "#06ADB4", "#ECCE1D", "#F08323", "#F05052"
  // ]

  // const randomColor = () => {
  //   setNowColor(_.sample(colors))
  // }
  const [nowColor, setNowColor] = useState("")
  const [nowFace, setNowFace] = useState("")
  const [nowNum, setNowNum] = useState(_.random(0, 7))
  
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
  

  // const findColor = () => {
  //   switch (nowFace) {
  //     case face1:
  //       setNowColor("#EE5F5B")
  //       break
  //     case face2:
  //       setNowColor("#F6A95B")
  //       break
  //     case face3:
  //       setNowColor("#F5DE5E")
  //       break
  //     case face4:
  //       setNowColor("#3264C3")
  //       break
  //     case face5:
  //       setNowColor("#7E9CC2")
  //       break
  //     case face6:
  //       setNowColor("#B8DE6F")
  //       break
  //     case face7:
  //       setNowColor("#DAB801")
  //       break
  //     case face8:
  //       setNowColor("#018699")
  //       break
  //     default:
  //       break
  //   }
  // }

  return (
    <div className="flip">  
      <div className="card">
        <div className="front">
          <div 
            className="front-top"
            style={{ backgroundColor: nowColor }}
          >
            <img src={nowFace} />
          </div>
          <div className="front-bottom">
            {consultingItem.title}
          </div>
        </div>
        <div 
          className="back"
          style={{ backgroundColor: nowColor }}
        >
          <div className="back-content">
            <div className="back-content-index">방장</div>
            <div className="back-content-context">{consultingItem.host}</div>
          </div>
          {/* <div className="back-content">
            <div className="back-content-index">제목</div>
            <div className="back-content-context">{consultingItem.title}</div>
          </div> */}
          <div className="back-content">
            <div className="back-content-index">내용</div>
            <div className="back-content-context">{consultingItem.text}</div>
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

export default ConsultingListItem;
