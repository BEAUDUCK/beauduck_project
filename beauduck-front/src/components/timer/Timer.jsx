import { useEffect } from 'react';
import { useState } from 'react';

const Timer = ({ changeIdx }) => {
  const [second, setSecond] = useState(4);
  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(second) > 0) {
        setSecond(parseInt(second) - 1);
      } else if (parseInt(second) === 0) {
        changeIdx();
        clearInterval(countdown);
        setSecond(4);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [second]);

  return (
    <div className="timer">
      <h1>{second}</h1>
    </div>
  );
};

export default Timer;
