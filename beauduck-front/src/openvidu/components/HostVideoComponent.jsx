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
  return (
    <div className="host-stream">
      <StreamComponent user={user} />
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
  );
};

export default HostVideoComponent;
