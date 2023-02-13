import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getConsultDetail, loadingOut } from './ConsultingSlice';

const ConsultingModalLoadingHost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId, consultDetail } = useSelector((state) => state.consulting);
  const { userList } = useSelector((state) => state.consulting);
  console.log('roomIdㅐㅐ', roomId);
  console.log('유저리스트', userList);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(getConsultDetail(roomId));
  }, []);

  useEffect(() => {
    setUsers(userList);
  }, [userList]);

  // useEffect(() => {
  //   setInterval(() => {
  //     console.log('업데이트!');
  //   }, 5000);
  // });

  const handleStart = () => {
    dispatch(loadingOut());
    navigate('/help/room');
  };

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
      <p>{users.length}</p>
      <div className="loading-list">
        {users?.map((user) => (
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

export default ConsultingModalLoadingHost;
