import { useEffect } from "react";
import { useState } from "react";

import color1 from "../../../assets/face_color/1.PNG"
import color2 from "../../../assets/face_color/2.PNG"
import color3 from "../../../assets/face_color/3.PNG"
import color4 from "../../../assets/face_color/4.PNG"
import color5 from "../../../assets/face_color/5.PNG"
import color6 from "../../../assets/face_color/6.PNG"
import color7 from "../../../assets/face_color/7.PNG"
import color8 from "../../../assets/face_color/8.PNG"
import color9 from "../../../assets/face_color/9.PNG"
import color10 from "../../../assets/face_color/10.PNG"
import color11 from "../../../assets/face_color/11.PNG"
import color12 from "../../../assets/face_color/12.PNG"
import color13 from "../../../assets/face_color/13.PNG"
import color14 from "../../../assets/face_color/14.PNG"
import color15 from "../../../assets/face_color/15.PNG"
import color16 from "../../../assets/face_color/16.PNG"
import color17 from "../../../assets/face_color/17.PNG"
import color18 from "../../../assets/face_color/18.PNG"
import color19 from "../../../assets/face_color/19.PNG"
import color20 from "../../../assets/face_color/20.PNG"
import color21 from "../../../assets/face_color/21.PNG"
import color22 from "../../../assets/face_color/22.PNG"
import color23 from "../../../assets/face_color/23.PNG"
import color24 from "../../../assets/face_color/24.PNG"
import color25 from "../../../assets/face_color/25.PNG"
import color26 from "../../../assets/face_color/26.PNG"
import color27 from "../../../assets/face_color/27.PNG"
import color28 from "../../../assets/face_color/28.PNG"
import color29 from "../../../assets/face_color/29.PNG"
import color30 from "../../../assets/face_color/30.PNG"
import color31 from "../../../assets/face_color/31.PNG"
import color32 from "../../../assets/face_color/32.PNG"
import color33 from "../../../assets/face_color/33.PNG"
import color34 from "../../../assets/face_color/34.PNG"
import color35 from "../../../assets/face_color/35.PNG"
import color36 from "../../../assets/face_color/36.PNG"
import color37 from "../../../assets/face_color/37.PNG"
import color38 from "../../../assets/face_color/38.PNG"
import color39 from "../../../assets/face_color/39.PNG"
import color40 from "../../../assets/face_color/40.PNG"
import color41 from "../../../assets/face_color/41.PNG"
import color42 from "../../../assets/face_color/42.PNG"
import color43 from "../../../assets/face_color/43.PNG"
import color44 from "../../../assets/face_color/44.PNG"
import color45 from "../../../assets/face_color/45.PNG"
import color46 from "../../../assets/face_color/46.PNG"
import color47 from "../../../assets/face_color/47.PNG"
import color48 from "../../../assets/face_color/48.PNG"
import color49 from "../../../assets/face_color/49.PNG"
import color50 from "../../../assets/face_color/50.PNG"


const Photos = () => {
  const colors = [
    color1, color2, color3, color4, color5, color6, color7, color8, color9, color10,
    color11, color12, color13, color14, color15, color16, color17, color18, color19, color20,
    color21, color22, color23, color24, color25, color26, color27, color28, color29, color30,
    color31, color32, color33, color34, color35, color36, color37, color38, color39, color40,
    color41, color42, color43, color44, color45, color46, color47, color48, color49, color50,
  ]
  const [nowPhoto, setNowPhoto] = useState(null)
  const [nowCnt, setNowCnt] = useState(0)

  useEffect(() => {
    const changePhoto = setInterval(() => {
      setNowPhoto(colors[nowCnt])
      setNowCnt(nowCnt+1)
    }, 5000)

  }, [nowPhoto])

  return (
    <div>
      <img 
        src={nowPhoto}
        alt="사진"
        style={{ position: "absolute", width: "30vw", height: "40vh", top: "0", left: "35vw" }}
      />
    </div>
  )
};

export default Photos