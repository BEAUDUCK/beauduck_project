import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Timer from '../../components/timer/Timer';
import {
  setAllExerciseResult,
  setExerciseStatus,
  setMyExerciseResult,
} from '../../features/help/ConsultingSlice';
import GetScore from './getscore/GetScore';
import Photos from './photos/Photos';
import StartBtn from './StartBtn';
import OvVideoComponent from './stream/OvVideo';
import StreamComponent from './stream/StreamComponent';
import ToolbarComponent from './toolbar/ToolbarComponent';
import './VideoRoomComponent.scss';

const UserVideoComponent = ({
  hostNickname,
  user,
  streamId,
  sessionId,
  showNotification,
  camStatusChanged,
  micStatusChanged,
  leaveSession,
  // isHost,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isExercising, isHost } = useSelector((state) => state.consulting);
  const admin = useSelector((state) => state.consulting.consultDetail.hostId);
  const [isFinished, setFinished] = useState(false);

  // 진행 시작
  const setExercising = (value) => {
    dispatch(setExerciseStatus(value));
  };
  console.log('isExercising', isExercising);

  // 인덱스 바꾸기
  const [nowIdx, setNowIdx] = useState(0);
  const changeIdx = useCallback(() => {
    console.log('인덱스 바뀐다~', nowIdx + 1);
    setNowIdx(nowIdx + 1);
  }, [nowIdx]);

  const resultUsers = useRef({
    personalResults: [],
    allResults: [],
  });

  // 끝내기 -> 데이터 보내기
  const finishExercise = useCallback(() => {
    console.log('진단 끝! 내 어쩌구저쩌구 :  ', resultUsers);
    dispatch(setMyExerciseResult(resultUsers.current.personalResults));

    user.getStreamManager().stream.session.signal({
      data: JSON.stringify(resultUsers.current),
      type: 'finish',
      to: [admin],
    });
  });

  useEffect(() => {
    if (nowIdx === 5) {
      setExercising(false);
      if (!isHost) {
        // 🦴 게스트만 선택 결과 저장
        console.log('나는 호스트인가?', isHost);
        finishExercise();
      }
    }
    return;
  }, [nowIdx]);

  let participantCount = undefined;
  let recivedCount = 0;

  useEffect(() => {
    // ⭐ 버튼 클릭시 signal : start
    user.getStreamManager().stream.session.on('signal:start', (event) => {
      setExercising(true);
    });

    // ⭐ 인덱스 종료 시 signal : finish
  }, []);

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
          console.log(resultUsers.current);
          setTimeout(() => {
            console.log('결과 전송 끝 !', isFinished);
            setFinished(true);
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
      setExercising(false);
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
    <div>
      {user !== undefined ? (
        <>
          {user.nickname === hostNickname && (
            <div className="host-stream">
              <StreamComponent user={user} streamId={streamId} />
              <ToolbarComponent
                sessionId={sessionId}
                user={user}
                showNotification={showNotification}
                camStatusChanged={camStatusChanged}
                micStatusChanged={micStatusChanged}
                leaveSession={leaveSession}
              />
              <StartBtn user={user} />
            </div>
          )}
          {user.nickname !== hostNickname && (
            <>
              <div
                className="guest-stream"
                style={{ position: 'absolute', top: '0' }}
              >
                <StreamComponent user={user} streamId={streamId} />
                {isExercising && (
                  <GetScore
                    nowIdx={nowIdx}
                    user={user}
                    resultUsers={resultUsers}
                  />
                )}
              </div>
            </>
          )}
        </>
      ) : null}
      {isExercising && <Timer changeIdx={changeIdx} />}
      {isExercising && <Photos nowIdx={nowIdx} />}
    </div>
  );
};

export default React.memo(UserVideoComponent);
