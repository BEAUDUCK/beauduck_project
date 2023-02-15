import GuestVideoComponent from './GuestVideoComponent';
import HostVideoComponent from './HostVideoComponent';
import React, { useCallback, useEffect, useState } from 'react';
import Timer from '../../components/timer/Timer';
import Photos from './photos/Photos';
import { setExerciseStatus } from '../../features/help/ConsultingSlice';
import { useDispatch, useSelector } from 'react-redux';

const AllComp = ({
  myUserName,
  hostNickname,
  user,
  sessionId,
  showNotification,
  camStatusChanged,
  micStatusChanged,
  leaveSession,
  isHost,
  subscribers,
}) => {
  const dispatch = useDispatch();

  // 진행 시작
  const { isExercising, isFinished } = useSelector((state) => state.consulting);

  useEffect(() => {
    // ⭐ 버튼 클릭시 signal : start
    user.getStreamManager().stream.session.on('signal:start', (event) => {
      dispatch(setExerciseStatus('consult'));
    });
  }, []);
  console.log('isExercising', isExercising);
  console.log('isFinished', isFinished);

  // 인덱스 바꾸기
  const [nowIdx, setNowIdx] = useState(0);
  const changeIdx = useCallback(() => {
    console.log('인덱스 바뀐다~', nowIdx + 1);
    setNowIdx(nowIdx + 1);
  }, [nowIdx]);

  // 진단 종료
  useEffect(() => {
    if (nowIdx === 5) {
      console.log('인덱스 종료');
      dispatch(setExerciseStatus('done'));
    }
  }, [nowIdx]);

  return (
    <>
      {isHost ? (
        <HostVideoComponent
          user={user}
          sessionId={sessionId}
          showNotification={showNotification}
          camStatusChanged={camStatusChanged}
          micStatusChanged={micStatusChanged}
          leaveSession={leaveSession}
          isHost={isHost}
        />
      ) : (
        <GuestVideoComponent user={user} isHost={isHost} nowIdx={nowIdx} />
      )}
      {subscribers.map((sub, i) =>
        sub.nickname !== hostNickname ? (
          <GuestVideoComponent user={sub} isHost={isHost} nowIdx={nowIdx} />
        ) : (
          <HostVideoComponent
            user={sub}
            sessionId={sessionId}
            showNotification={showNotification}
            camStatusChanged={camStatusChanged}
            micStatusChanged={micStatusChanged}
            leaveSession={leaveSession}
            isHost={isHost}
          />
        ),
      )}
      {isExercising === 'consult' && <Timer changeIdx={changeIdx} />}
      {isExercising === 'consult' && <Photos nowIdx={nowIdx} />}
    </>
  );
};

export default React.memo(AllComp);
