import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMyExerciseResult } from '../../features/help/ConsultingSlice';
import GetScore from './getscore/GetScore';
import StreamComponent from './stream/StreamComponent';
const GuestVideoComponent = ({
  hostNickname,
  user,
  sessionId,
  showNotification,
  camStatusChanged,
  micStatusChanged,
  leaveSession,
  isHost,
  nowIdx,
  subIdx,
  myStyle,
}) => {
  const dispatch = useDispatch();
  const { isExercising, isFinished } = useSelector((state) => state.consulting);
  const admin = useSelector((state) => state.consulting.consultDetail.hostId);
  const resultUsers = useRef({
    personalResults: [],
  });

  const finishExercise = useCallback(() => {
    console.log('진단 끝! 내 어쩌구저쩌구 :  ', resultUsers);
    user.getStreamManager().stream.session.signal({
      data: JSON.stringify(resultUsers.current),
      type: 'finish',
      to: [admin],
    });
    dispatch(setMyExerciseResult(resultUsers.current.personalResults));
    return;
  });

  useEffect(() => {
    if (isExercising === 'done') {
      console.log('끝났엉 isExercising', isExercising);
      finishExercise();
    }
  }, [isExercising]);

  return (
    <div
      className={[
        'guest-stream',
        subIdx % 2 ? 'even-guest' : 'odd-guest',
        `${myStyle}`,
      ].join(' ')}
    >
      <StreamComponent user={user} />
      {isExercising === 'consult' && (
        <GetScore nowIdx={nowIdx} user={user} resultUsers={resultUsers} />
      )}
    </div>
  );
};

export default React.memo(GuestVideoComponent);
