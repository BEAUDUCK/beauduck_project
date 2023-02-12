import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getConsultDetail } from './ConsultingSlice';

const ConsultingModalLoadingHost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId, consultDetail, userList } = useSelector(
    (state) => state.consulting,
  );

  const { consultingList } = useSelector((state) => state.consulting);

  console.log('roomId', roomId);
  useEffect(() => {
    dispatch(getConsultDetail(roomId));
  }, []);

  const handleStart = () => {
    navigate('/help/room', { state: consultDetail });
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
      <div className="loading-list">
        {userList?.map((user) => (
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
