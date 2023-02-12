import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setScoreFirst, setScoreSecond } from '../../../features/help/ConsultingSlice';
const scoreList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const GetScore = ({ isActive }) => {
  const dispatch = useDispatch();
  const [idx, setIdx] = useState(-1);
  const location = useLocation()
  const navigate = useNavigate()
  // const [scoreList, setScoreList] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    // setInterval(() => {
    //   if (idx < 49) {
    //     setIdx(idx + 1);
    //   } else {
    //     dispatch(setScoreSecond(scoreList))
    //   }
    // }, 5000);
    setInterval(() => {
      // if (idx < 50) {
      if (idx < 49) {
        setIdx(idx + 1)
        console.log("idx :", idx)
      }
    }, 5000)

  }, [idx]);

  const selectGood = () => {
    // dispatch(setScoreFirst(idx));
    // dispatch(setScoreSecond(idx));
    scoreList[idx % 10] += 1
    console.log(scoreList)
  };

  const handleFinish = () => {
    dispatch(setScoreSecond(scoreList))
    navigate("/help/result")
  }

  return (
    <>
      <button onClick={selectGood}>good</button>
      <button onClick={handleFinish}>종료</button>
    </>
  );
};

export default GetScore;