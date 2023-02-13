import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import CustomRoomComponent from "../openvidu/components/CustomRoomComponent";
import VideoRoomComponent from '../openvidu/components/VideoRoomComponent';

// 컨설팅 받는 페이지
// roomId로 data dispatch
// 후에 useSelector 로 hostNickname, userCount, userList 받아오기

const ConsultingRoomPage = () => {
  // location으로 받아온 데이터
  // roomId,
  // consultDetail = {content, hostId, hostNickname, roomId, title, userCount, userList = {nickname, userId}}
  // const location = useLocation()
  // const { state } = location
  const { nickName } = useSelector((state) => state.member);
  const { consultDetail, userList, isHost } = useSelector(
    (state) => state.consulting,
  );

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: '999',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
      }}
    >
      <VideoRoomComponent
        sessionName={consultDetail.roomId}
        host={consultDetail.hostNickname}
        myUserName={nickName}
        userList={userList}
        isHost={isHost}
      />
    </div>
  );
};

export default ConsultingRoomPage;
