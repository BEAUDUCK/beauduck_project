import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CustomRoomComponent from "../openvidu/components/CustomRoomComponent";

// 컨설팅 받는 페이지
// roomId로 data dispatch
// 후에 useSelector 로 hostNickname, userCount, userList 받아오기

const ConsultingRoomPage = () => {
  
  // location으로 받아온 데이터 
  // roomId, 
  // consultDetail = {content, hostId, hostNickname, roomId, title, userCount, userList = {nickname, userId}}
  const location = useLocation()
  const { consultDetail, isRoomAdmin } = location.state
  const myNickname = useSelector(state => state.member.nickName)

  return (
    <div className="full-screen">
      <CustomRoomComponent
        sessionName={consultDetail.roomId}
        host={consultDetail.hostNickname}
        user={myNickname}
        isRoomAdmin={isRoomAdmin}
      />
    </div>
  );
};

export default ConsultingRoomPage;
