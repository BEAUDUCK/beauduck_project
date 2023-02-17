import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TogetherRoomComponent from "../openvidu/components/TogetherRoomComponent";
import getTogetherDetail, { enterUser } from "../features/together/TogetherSlice"
import { useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";

const TogetherRoomPage = ({ roomId, host }) => {

  const dispatch = useDispatch()
  const location = useLocation()
  const myNickname = useSelector(state => state.member.nickName)
  const myId = useSelector(state => state.member.memberId)
  const { state } = location
  const { isHost } = useSelector(state => state.together)
  const navigate = useNavigate()
  console.log(state)
  useEffect(() => {
    const newUser = {
      nickname: myNickname,
      roomId: state.roomId,
      userId: myId
    }
    dispatch(enterUser(newUser))
  }, [])

  const colors = ["#E8B0B0","#F03838","#EBEBEB","#FE9B7F","#F7F4EF","#C23445","#811F4C","#B28DB7","#3D2F2B","#BF1B36",
  "#FF8384","#81CCAB","#B9DDFF","#7EBC42","#8A97C3","#4A478C","#292830","#A18E40","#006359","#006E47",
  "#D1EEFB","#FDF650","#FEDCF5","#8884BE","#CEA9CB","#99A401","#422944","#818C75","#70491B","#FFFD36",
  "#FEBC60","#B2B099","#DBBAC7","#C189CA","#96B09D","#DD3737","#BCA548","#B8616D","#2F124E","#D73A6F",
  "#90E5D8","#5AC9E5","#F4CFFB","#F15D57","#B4BAD2","#006A8A","#535617","#546E6C","#5B2D41","#0000FE"]
  const myColor = _.sample(colors)

  return (
    <div style={{ position: "fixed", zIndex: "999" ,width: "100vw", height: "100vh", backgroundColor: "#FFF8BC" }}>
      <TogetherRoomComponent 
        sessionName={state.roomId}
        hostNickname={state.hostNickname}
        user={myNickname}
        isHost={isHost}
        navigate={navigate}
        myId={myId}
        myColor={myColor}
      />
    </div>
  );
};

export default TogetherRoomPage;
