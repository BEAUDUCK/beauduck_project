import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  setAllExerciseResult,
  setExerciseStatus,
  setFinishStatus,
} from '../../features/help/ConsultingSlice';
import StartBtn from './StartBtn';
import StreamComponent from './stream/StreamComponent';
// import ToolbarComponent from './toolbar/ToolbarComponent';

const HostVideoComponent = ({
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
  const navigate = useNavigate();
<<<<<<< HEAD
  const { isExercising, isFinished, maxIdx } = useSelector(
    (state) => state.consulting,
  );
=======
  // isExercising 지움
  const { isFinished } = useSelector((state) => state.consulting);
>>>>>>> 1b4cafb09db5fcc3a9500ff67c76b2ca5268a28c

  const resultUsers = useRef({
    allResults: [],
  });

  let participantCount = undefined;
  let recivedCount = 0;

  const [finalIdx, setFinalIdx] = useState(-1);

  useEffect(() => {
    user.getStreamManager().stream.session.on('signal:finish', (event) => {
      if (isHost) {
        const session = user.getStreamManager().stream.session;
        console.log('finish : event.data', event.data);
        resultUsers.current.allResults.push(JSON.parse(event.data));

        if (!participantCount) {
          participantCount = session.streamManagers.length - 1;
          console.log('인원수 : ', participantCount);
        }
        recivedCount++;

        if (recivedCount === participantCount) {
          // 모든 참여자의 정보를 수신하면 4초후 결과창 이동
          console.log('모든 참여자들의 결과 기록 수신 완료 ');
          console.log(resultUsers.current.allResults);

          dispatch(setAllExerciseResult(resultUsers.current.allResults));
          dispatch(setFinishStatus(true));

          user.getStreamManager().stream.session.signal({
            data: maxIdx,
            type: 'result',
            to: [resultUsers.current.allResults.memberId],
          });

          console.log('결과 전송 끝 !', isFinished);
          setTimeout(() => {
            leaveSession();
            navigate('/help/result');
          }, 10000);
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
    // user.getStreamManager().stream.session.on('signal:result', (event) => {
    //   if (isHost) {
    //     console.log('signal: result', event.data);
    //     const res = JSON.parse(event.data);
    //     console.log('운동 결과 데이터 수신', res);

    //     dispatch(setAllExerciseResult(res.allResults));
    // .then((res) => {
    //   console.log('결과', res);
    //   setFinalIdx(res);
    // });
    // console.log('res.allResults', res.allResults);

    // user.getStreamManager().stream.session.signal({
    //   data: finalIdx,
    //   type: 'result',
    //   to: subscribers,
    // });

    //     setTimeout(() => {
    // leaveSession();
    // navigate('/help/result');
    //     }, 10000);
    //   }
    // });

    user.getStreamManager().stream.session.on('signal:exit', (event) => {
      console.log('비정상종료 ', event.data);
      dispatch(setExerciseStatus('done'));
      leaveSession();
    });
  }, []);

  // useEffect(() => {
  //   if (isFinished) {
  //     user.getStreamManager().stream.session.signal({
  //       data: maxIdx,
  //       type: 'result',
  //       to: []
  //     });
  //     console.log('전송 끝 ');
  //   }
  // }, [isFinished]);

  return (
    <div className="host-stream">
      <StreamComponent user={user} />
      {isHost ? (
        <>
          {/* <ToolbarComponent
            sessionId={sessionId}
            user={user}
            showNotification={showNotification}
            camStatusChanged={camStatusChanged}
            micStatusChanged={micStatusChanged}
            leaveSession={leaveSession}
          /> */}
          <StartBtn user={user} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default React.memo(HostVideoComponent);
