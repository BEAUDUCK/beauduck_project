import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAllExerciseResult,
  setExerciseStatus,
  setFinishStatus,
} from '../../features/help/ConsultingSlice';
import StartBtn from './StartBtn';
import StreamComponent from './stream/StreamComponent';
import ToolbarComponent from './toolbar/ToolbarComponent';

const HostVideoComponent = ({
  hostNickname,
  user,
  sessionId,
  showNotification,
  camStatusChanged,
  micStatusChanged,
  leaveSession,
  isHost,
}) => {
  const dispatch = useDispatch();
  const { isExercising, isFinished } = useSelector((state) => state.consulting);

  const resultUsers = useRef({
    allResults: [],
  });

  let participantCount = undefined;
  let recivedCount = 0;

  useEffect(() => {
    user.getStreamManager().stream.session.on('signal:finish', (event) => {
      if (isHost) {
        const session = user.getStreamManager().stream.session;
        console.log('finish : event.data', event.data);
        resultUsers.current.allResults.push(JSON.parse(event.data));

        if (!participantCount) {
          participantCount = session.streamManagers.length;
          console.log('인원수 : ', participantCount);
        }
        recivedCount++;

        if (recivedCount === participantCount) {
          // 모든 참여자의 정보를 수신하면 4초후 결과창 이동
          console.log('모든 참여자들의 결과 기록 수신 완료 ');
          console.log(resultUsers.current.allResults);
          setTimeout(() => {
            console.log('결과 전송 끝 !', isFinished);
            dispatch(setFinishStatus(true));
          }, 4000);
        }

        // setExercising(false);
        // setTimeout(() => {
        //   // 결과 데이터를 참여자의 수 만큼 받지 못하는 상황일 경우 최초 결과 데이터 수신된 시점으로 5초후 결과창 이동
        //   console.log('10초끝!');
        //   console.log(resultUsers);
        //   setFinished(true);
        // }, 10000);
      }
    });

    // ⭐ signal : result
    user.getStreamManager().stream.session.on('signal:result', (event) => {
      if (isHost) {
        console.log('signal: result', event.data);
        const res = JSON.parse(event.data);
        console.log('운동 결과 데이터 수신', res);

        dispatch(setAllExerciseResult(res.allResults));
        console.log('res.allResults', res.allResults);
        // leaveSession();
        // navigate('/result');
      }
    });

    user.getStreamManager().stream.session.on('signal:exit', (event) => {
      console.log('비정상종료 ', event.data);
      dispatch(setExerciseStatus('done'));
      leaveSession();
    });
  }, []);

  useEffect(() => {
    if (isFinished) {
      user.getStreamManager().stream.session.signal({
        data: JSON.stringify(resultUsers.current),
        type: 'result',
      });
      console.log('전송 끝 ');
    }
  }, [isFinished]);

  return (
    <div className="host-stream">
      <StreamComponent user={user} />
      {isHost ? (
        <>
          <ToolbarComponent
            sessionId={sessionId}
            user={user}
            showNotification={showNotification}
            camStatusChanged={camStatusChanged}
            micStatusChanged={micStatusChanged}
            leaveSession={leaveSession}
          />
          <StartBtn user={user} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default React.memo(HostVideoComponent);
