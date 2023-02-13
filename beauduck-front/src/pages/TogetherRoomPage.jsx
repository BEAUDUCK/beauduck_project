import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TogetherRoomComponent from "../openvidu/components/TogetherRoomComponent";
import getTogetherDetail from "../features/together/TogetherSlice"
import { useLocation } from "react-router-dom";

const TogetherRoomPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const { state } = location
  const myNickname = useSelector(state => state.member.nickName)
  useEffect(() => {
    
  }, [])
  console.log(state, myNickname)

  return (
    <div style={{ position: "fixed", zIndex: "999" ,width: "100vw", height: "100vh", backgroundColor: "white" }}>
      {/* <TogetherRoomComponent 
        sessionName={roomId}
        hostNickname={togetherDetail.hostNickname}
        user={myNickname}
      /> */}
    </div>
  );
};

export default TogetherRoomPage;
