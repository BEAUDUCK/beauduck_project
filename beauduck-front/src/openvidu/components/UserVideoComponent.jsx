import { useEffect, useState } from 'react';
import Timer from '../../components/timer/Timer';
import GetScore from './getscore/GetScore';
import Photos from './photos/Photos';
import OvVideoComponent from './stream/OvVideo';
import StreamComponent from './stream/StreamComponent';
import ToolbarComponent from './toolbar/ToolbarComponent';
import './VideoRoomComponent.scss';

const UserVideoComponent = ({
  isHost,
  user,
  streamId,
  sessionId,
  showNotification,
  camStatusChanged,
  micStatusChanged,
  leaveSession,
}) => {
  const [isActive, setIsActive] = useState(false);
  const startConsulting = () => {
    setIsActive(!isActive);
  };

  const [nowIdx, setNowIdx] = useState(47);
  const changeIdx = () => {
    console.log('인덱스 바뀐다~', nowIdx + 1);
    setNowIdx(nowIdx + 1);
  };

  useEffect(() => {
    if (nowIdx === 50) {
      setIsActive(!isActive);
      // 진단 후 실행할 거 여기 넣자
      alert('종료되었슴다');
    }
  }, [nowIdx]);
  return (
    <div>
      {user !== undefined ? (
        <>
          {isHost && (
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
              <button className="start-button" onClick={startConsulting}>
                시작하기
              </button>
              {isActive && <Timer changeIdx={changeIdx} />}
              {isActive && <Photos nowIdx={nowIdx} />}
            </div>
          )}
          {!isHost && (
            <div className="guest-stream">
              <StreamComponent user={user} streamId={streamId} />
              {isActive && <GetScore nowIdx={nowIdx} />}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
