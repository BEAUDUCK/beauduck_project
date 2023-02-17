import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enterUser, outUser } from "./TogetherSlice";

const TogetherModalGuest = ({ roomId, host, isOpenClick }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { memberId, nickName } = useSelector(state => state.member)
  const { togetherDetail } = useSelector(state => state.together)
  const [isReady, setIsReady] = useState(false)

  const ChangeStatus = () => {
    // setIsReady(!isReady);
    // 이벤트에 준비상태 host 한테 보내는 기능 추가
    navigate("/together/room", { state: togetherDetail })
  };

  const goBack = () => {
    // 방에 들어와있는 유저에서 제외하고, 모달을 닫는 로직 작성
    const payload = {
      nickname: nickName,
      roomId,
      userId: memberId,
    };
    dispatch(outUser(payload));
    isOpenClick();
  };

  useEffect(() => {
    const payload = {
      nickname: nickName,
      roomId,
      userId: memberId,
    };
    console.log('payload', payload);
    dispatch(enterUser(payload));
  }, []);

  return (
    <div className={['loading-modal', 'guest'].join(' ')}>
      <FontAwesomeIcon
        className="back-icon"
        icon="fa-solid fa-circle-chevron-left"
        onClick={goBack}
      />
      <h3>{host}님이 소통중이덕</h3>
      <button
        onClick={ChangeStatus}
        className={['loading-bigbtn', 'guest-bigbtn'].join(' ')}
      >
        READY
      </button>
      {isReady ? (
        <FontAwesomeIcon
          className={['battery', 'full'].join(' ')}
          icon="fa-solid fa-battery-full"
        />
      ) : (
        <FontAwesomeIcon
          className={['battery', 'less'].join(' ')}
          icon="fa-solid fa-battery-quarter"
        />
      )}
    </div>
  );

};

export default TogetherModalGuest;