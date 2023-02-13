import { useEffect, useRef, useState } from 'react';
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
  // isActive,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isExercising, userList } = useSelector((state) => state.consulting);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const startConsulting = () => {
    setIsActive(!isActive);
  };

  const [nowIdx, setNowIdx] = useState(0);
  const changeIdx = () => {
    console.log('인덱스 바뀐다~', nowIdx + 1);
    setNowIdx(nowIdx + 1);
  };

  //-----------------------
  const { memberId } = useSelector((state) => state.member);
  const admin = useSelector((state) => state.consulting.consultDetail.hostId);
  console.log('admin', admin);

  const [beforeIdx, setBeforeIdx] = useState(0);

  const [isClick, setIsClick] = useState(false);

  const selectGood = () => {
    // dispatch(setScoreFirst(idx));
    // dispatch(setScoreSecond(idx));
    if (!isClick) {
      resultUsers.current.personalResults[nowIdx % 10] += 1;
      console.log(
        'resultUsers.current.personalResults',
        resultUsers.current.personalResults,
      );
      setIsClick(true);
    }
    if (beforeIdx !== nowIdx) {
      setBeforeIdx(nowIdx);
      setIsClick(false);
    }
    // true (이미 눌렀으면 눌렀다고 말해주기)
    // 아니면 처음 누를때 잘 눌렸다고 말해주기
  };

  const finishExercise = (result) => {
    // setExercising(false)
    const res = {
      memberId,
      personalResultDetails: resultUsers.current.personalResults,
    };

    console.log('진단 끝! 내 어쩌구저쩌구 :  ', res);
    dispatch(setMyExerciseResult(res));
    // setAlert('alert');

    user.getStreamManager().stream.session.signal({
      data: JSON.stringify(res),
      type: 'finish',
      to: [admin],
    });
  };

  //-----------------------

  useEffect(() => {
    if (nowIdx === 5) {
      setIsActive(!isActive);
      // 진단 후 실행할 거 여기 넣자
      finishExercise();
      setExercising(false);
      // alert('종료되었슴다');
    }
  }, [nowIdx]);

  const setExercising = (value) => {
    dispatch(setExerciseStatus(value));
  };
  console.log('isExercising', isExercising);

  let participantCount = undefined;
  let recivedCount = 0;

  const resultUsers = useRef({
    personalResults: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {
    // console.log('스트림매니저!!!!!!!11', user.streamManager);
    console.log('유저!!!!!!!!!!!1', user);
    const session = user.getStreamManager().stream.session;
    console.log('session', session);
    user.getStreamManager().stream.session.on('signal:start', (event) => {
      console.log('시작함');
      setExercising(true);
    });

    user.getStreamManager().stream.session.on('signal:finish', (event) => {
      const session = user.getStreamManager().stream.session;
      resultUsers.current.personalResults.push(JSON.parse(event.data));

      if (!participantCount) {
        participantCount = session.streamManagers.length;
        console.log('운동한 인원수 : ', participantCount);
      }
      recivedCount++;

      if (recivedCount === participantCount) {
        // 모든 참여자의 정보를 수신하면 4초후 결과창 이동
        console.log('모든 참여자들의 결과 기록 수신 완료 ');
        console.log(resultUsers.current);
        setTimeout(() => {
          console.log('결과 전송 끝 !');
          setFinished(true);
        }, 4000);
      }

      setExercising(false);
      setTimeout(() => {
        // 결과 데이터를 참여자의 수 만큼 받지 못하는 상황일 경우 최초 결과 데이터 수신된 시점으로 5초후 결과창 이동
        console.log('10초끝!');
        console.log(resultUsers);
        setFinished(true);
      }, 10000);
    });

    user.getStreamManager().stream.session.on('signal:result', (event) => {
      const res = JSON.parse(event.data);
      console.log('운동 결과 데이터 수신', res);
      // setExercising(true)

      dispatch(setAllExerciseResult(res.data));
      // if (isRoomAdmin) {
      //   http.delete(`room/${teamId}`)
      // }
      leaveSession();
      navigate('/result');
    });

    user.getStreamManager().stream.session.on('signal:exit', (event) => {
      console.log('비정상종료 ', event.data);
      setExercising(false);
      leaveSession();
      // setAlert('error');
    });
  }, []);

  return (
    <div>
      {user !== undefined ? (
        <>
          {user.nickname === hostNickname && (
            <div className="host-stream">
              <StreamComponent
                user={user}
                streamId={streamId}
                // isActive={isActive}
                // changeIdx={changeIdx}
                // nowIdx={nowIdx}
              />
              <ToolbarComponent
                sessionId={sessionId}
                user={user}
                showNotification={showNotification}
                camStatusChanged={camStatusChanged}
                micStatusChanged={micStatusChanged}
                leaveSession={leaveSession}
              />
              <h1>호스트</h1>
              <StartBtn user={user} />
              {/* <button className="start-button" onClick={startConsulting}>
                시작하기
              </button> */}
              {/* {/* {isActive && <Timer changeIdx={changeIdx} />} */}
              {/* {isActive && <Photos nowIdx={nowIdx} />} */}
            </div>
          )}
          {user.nickname !== hostNickname && (
            <>
              <div className="guest-stream">
                <h1>게스트</h1>
                <StreamComponent user={user} streamId={streamId} />
                {isExercising && (
                  // <GetScore
                  //   nowIdx={nowIdx}
                  //   user={user}
                  //   resultUser={resultUsers}
                  // />

                  <button onClick={selectGood} className="select-button">
                    good
                  </button>
                )}
              </div>
            </>
          )}
        </>
      ) : null}
      {isExercising && <Timer changeIdx={changeIdx} />}
      {isExercising && <Photos nowIdx={nowIdx} />}
      {/* <Timer changeIdx={changeIdx} /> */}
      {/* <Photos nowIdx={nowIdx} /> */}
    </div>
  );
};

export default UserVideoComponent;
