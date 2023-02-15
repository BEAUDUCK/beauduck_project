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
}) => {
  console.log('나는 게스트다!', user);
  const dispatch = useDispatch();
  const { isExercising, isFinished } = useSelector((state) => state.consulting);
  const admin = useSelector((state) => state.consulting.consultDetail.hostId);

  const personalResults = useRef([]);

  const finishExercise = useCallback(() => {
    console.log('진단 끝! 내 어쩌구저쩌구 :  ', personalResults);
    dispatch(setMyExerciseResult(personalResults));

    user.getStreamManager().stream.session.signal({
      data: JSON.stringify(personalResults),
      type: 'finish',
      to: [admin],
    });
  });

  useEffect(() => {
    if (isExercising === false) {
      console.log('끝났엉 isExercising', isExercising);
      finishExercise();
    }
  }, [isExercising]);

  return (
    <div className="guest-stream">
      <StreamComponent user={user} />
      {isExercising && (
        <GetScore
          nowIdx={nowIdx}
          user={user}
          personalResults={personalResults}
        />
      )}
    </div>
  );
};

export default React.memo(GuestVideoComponent);
