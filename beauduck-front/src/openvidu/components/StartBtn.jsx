const StartBtn = ({ user }) => {
  const startExercise = () => {
    user.getStreamManager().stream.session.signal({
      data: '게임을 시작~~',
      type: 'start',
    });
  };

  return <button onClick={startExercise}>START</button>;
};

export default StartBtn;
