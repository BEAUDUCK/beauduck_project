import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  setScoreFirst,
  setScoreSecond,
} from '../../../features/help/ConsultingSlice';

const GetScore = ({ nowIdx }) => {
  const dispatch = useDispatch();
  const [idx, setIdx] = useState(-1);
  const navigate = useNavigate();

  const userScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const selectGood = () => {
    // dispatch(setScoreFirst(idx));
    // dispatch(setScoreSecond(idx));
    userScore[nowIdx % 10] += 1;
    console.log('userScore', userScore);
  };

  return (
    <>
      <button onClick={selectGood}>good</button>
    </>
  );
};

export default GetScore;
