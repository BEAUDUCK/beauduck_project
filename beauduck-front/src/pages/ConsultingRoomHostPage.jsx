import CustomRoomComponent from "../openvidu/components/CustomRoomComponent";

// 컨설팅 받는 페이지
// roomId로 data dispatch
// 후에 useSelector 로 hostNickname, userCount, userList 받아오기

const ConsultingRoomPage = () => {
  return (
    <div className="full-screen">
      <CustomRoomComponent />
    </div>
  );
};

export default ConsultingRoomPage;
