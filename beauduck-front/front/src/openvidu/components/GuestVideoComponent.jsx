import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Alert from '../../components/modal/Alert';
import ExitModal from '../../components/modal/ExitModal';
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
  const navigate = useNavigate();
  const { isExercising, isFinished } = useSelector((state) => state.consulting);
  const admin = useSelector((state) => state.consulting.consultDetail.hostId);
  const { memberId } = useSelector((state) => state.member);
  const resultUsers = useRef({
    memberId,
    personalResults: [],
  });

  const finishExercise = useCallback(() => {
    console.log('진단 끝! 내 어쩌구저쩌구 :  ', resultUsers);
    if (resultUsers.current.memberId === memberId) {
      if (resultUsers.current.personalResults.length > 0) {
        user.getStreamManager().stream.session.signal({
          data: JSON.stringify(resultUsers.current),
          type: 'finish',
          to: [admin],
        });
        dispatch(setMyExerciseResult(resultUsers.current.personalResults));
        setIsExit(!isExit);

        // user.getStreamManager().stream.session.on('signal:result', (event) => {
        //   console.log('이게 찍히면 끝', event.data);
        //   setTimeout(() => {
        //     leaveSession();
        //     navigate('/help/result/guest', { state: event.data });
        //   });
        // });
      }
    }
  });

  const [isExit, setIsExit] = useState(false);

  const finishSession = () => {
    leaveSession();
    navigate('/help');
  };

  // useEffect(() => {
  //   console.log('언제 바뀌니...');
  //   if (isFinished) {
  //     console.log('여기는..?');
  //     user.getStreamManager().stream.session.on('signal:result', (event) => {
  //       console.log('이게 찍히면 끝', event.data);
  //       setTimeout(() => {
  //         leaveSession();
  //         navigate('/help/result/guest', { state: event.data });
  //       });
  //     });
  //   }
  // });

  useEffect(() => {
    if (isExercising === 'done') {
      console.log('끝났엉 isExercising', isExercising);
      finishExercise();
    }
  }, [isExercising]);

  const color = ['#feccbe', '#feebb6', '#ddecca', '#b8e6e1', '#e3dbeb'];

  return (
    <>
      <div
        className={['guest-stream', `${myStyle}`].join(' ')}
        style={{ borderColor: `${color[subIdx]}` }}
      >
        <StreamComponent user={user} />
        {isExercising === 'consult' && (
          <GetScore nowIdx={nowIdx} user={user} resultUsers={resultUsers} />
        )}
      </div>
      {isExit && (
        <Alert text={'컨설팅이 종료되었습니다.'} onClickEvent={finishSession} />
      )}
    </>
  );
};

export default React.memo(GuestVideoComponent);
