import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Photos from './photos/Photos';

const Workout = () => {
  const dispatch = useDispatch();
  const [isRunning, setIsRunning] = useState(true);
  const colorIdx = useRef(0);

  // 인덱스 바꿈
  const changeIdx = () => {
    colorIdx.current++;
  };

  // 컨설팅 종료
  const FinishConsult = () => {
    setIsRunning(false);
  };

  const countSelect = () => {};

  return (
    <>
      <Photos nowIdx={colorIdx} />
    </>
  );
};

export default Workout;
