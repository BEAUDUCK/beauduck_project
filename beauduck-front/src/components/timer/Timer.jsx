import { useEffect, useRef } from 'react';
import { useState } from 'react';

const Timer = ({ changeIdx }) => {
  const didMount = useRef(false);
  const [second, setSecond] = useState(4);

  useEffect(() => {
    // if (didMount.current) {
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
    // } else {
    //   didMount.current = true;
    //   setTimeout(() => {
    //     setSecond(3);
    //   }, 10000);
    // }
  }, [second]);

  return (
    <div className="timer">
      <h1>{second}</h1>
    </div>
  );
};

export default Timer;
