import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TogetherRoomComponent from "../openvidu/components/TogetherRoomComponent";
import getTogetherDetail from "../features/together/TogetherSlice"
import { useLocation, useNavigate } from "react-router-dom";

const TogetherRoomPage = ({ roomId, host }) => {
  // useEffect(() => {
  //   if (myNickname === state.hostNickname) {
  //     console.log("같음")
  //     setIsHost(true)
  //   } else {
  //     console.log("다름")
  //     setIsHost(false)
  //   }
  //   console.log(isHost)
  // }, [])
  const dispatch = useDispatch()
  const location = useLocation()
  const myNickname = useSelector(state => state.member.nickName)
  const myId = useSelector(state => state.member.memberId)
  const { state } = location
  const [isHost, setIsHost] = useState(myNickname === state.hostNickname)
  const navigate = useNavigate()
  console.log(state)

  console.log(isHost)
  return (
    <div style={{ position: "fixed", zIndex: "999" ,width: "100vw", height: "100vh", backgroundColor: "#FFF8BC" }}>
      {/* <TogetherRoomComponent 
        sessionName={state.roomId}
        hostNickname={state.hostNickname}
        user={myNickname}
        isHost={isHost}
        navigate={navigate}
        myId={myId}
      /> */}
    </div>
  );
};

export default TogetherRoomPage;
