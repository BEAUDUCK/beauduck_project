import React from 'react';

const StartBtn = ({ user }) => {
  const startExercise = () => {
    user.getStreamManager().stream.session.signal({
      data: '게임을 시작~~',
      type: 'start',
    });
  };

  return (
    <button className="start-btn" onClick={startExercise}>
      START
    </button>
  );
};

export default React.memo(StartBtn);
