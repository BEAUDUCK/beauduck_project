import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTogetherDetail } from "./TogetherSlice";

const TogetherModalHost = ({ roomId, host, isOpenClick }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { togetherDetail } = useSelector(state => state.together)
  
  const { togetherList } = useSelector(state => state.together)
  
  useEffect(() => {
    dispatch(getTogetherDetail(roomId))
  }, [])

  const handleStart = () => {
    navigate("/together/room", { state: togetherDetail })
  }

  return (
    <div className="loading-modal">
      <button
        type="button"
        className="loading-bigbtn"
        onClick={() => {
          handleStart();
        }}
      >
        START
      </button>
      <h3 className="loading-h3">대기 리스트</h3>
      <div className="loading-list">
        {togetherDetail.userList?.map((user) => (
          <div className="each-user">
            <span className="username">{user.nickname}</span>
            <span className={['onoff', 'on-btn'].join(' ')}>ON</span>
            <span className={['onoff', 'off-btn'].join(' ')}>OFF</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TogetherModalHost;