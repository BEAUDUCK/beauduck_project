import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import RatingButton from '../../components/button/RatingButton';
import { submitMakeupResult } from './SingleSlice';

const SingleModalExitSurvey = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memberId } = useSelector((state) => state.member);
  const { nowMakeupId } = useSelector((state) => state.single);

  const [score, setScore] = useState(0);
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);

  const starRef = useRef(); // 아무것도 선택 안 했을 때 선택 유도

  const changeStar1 = () => {
    setStar1(true);
    setStar2(false);
    setStar3(false);
    setStar4(false);
    setStar5(false);
  };
  const changeStar2 = () => {
    setStar1(true);
    setStar2(true);
    setStar3(false);
    setStar4(false);
    setStar5(false);
  };
  const changeStar3 = () => {
    setStar1(true);
    setStar2(true);
    setStar3(true);
    setStar4(false);
    setStar5(false);
  };
  const changeStar4 = () => {
    setStar1(true);
    setStar2(true);
    setStar3(true);
    setStar4(true);
    setStar5(false);
  };
  const changeStar5 = () => {
    setStar1(true);
    setStar2(true);
    setStar3(true);
    setStar4(true);
    setStar5(true);
  };

  useEffect(() => {
    if (star5) {
      setScore(5);
    } else if (star4) {
      setScore(4);
    } else if (star3) {
      setScore(3);
    } else if (star2) {
      setScore(2);
    } else if (star1) {
      setScore(1);
    }
    console.log(score);
  }, [star1, star2, star3, star4, star5, score]);

  const submitStarScore = () => {
    const payload = {
      score: parseFloat(score),
      memberEntity: {
        id: memberId,
      },
      makeupEntity: {
        id: nowMakeupId,
      },
    };
    console.log(payload);
    dispatch(submitMakeupResult(payload)).then((res) => {
      navigate('/single', { replace: true });
    });
  };

  return (
    <div className="survey-modal">
      <h2>평가해덕</h2>
      <hr />
      <div ref={starRef}>
        <span onClick={changeStar1}>
          {!star1 ? (
            <FontAwesomeIcon className="star-icon" icon="fa-regular fa-star" />
          ) : (
            <FontAwesomeIcon className="star-icon" icon="fa-solid fa-star" />
          )}
        </span>
        <span onClick={changeStar2}>
          {!star2 ? (
            <FontAwesomeIcon className="star-icon" icon="fa-regular fa-star" />
          ) : (
            <FontAwesomeIcon className="star-icon" icon="fa-solid fa-star" />
          )}
        </span>
        <span onClick={changeStar3}>
          {!star3 ? (
            <FontAwesomeIcon className="star-icon" icon="fa-regular fa-star" />
          ) : (
            <FontAwesomeIcon className="star-icon" icon="fa-solid fa-star" />
          )}
        </span>
        <span onClick={changeStar4}>
          {!star4 ? (
            <FontAwesomeIcon className="star-icon" icon="fa-regular fa-star" />
          ) : (
            <FontAwesomeIcon className="star-icon" icon="fa-solid fa-star" />
          )}
        </span>
        <span onClick={changeStar5}>
          {!star5 ? (
            <FontAwesomeIcon className="star-icon" icon="fa-regular fa-star" />
          ) : (
            <FontAwesomeIcon className="star-icon" icon="fa-solid fa-star" />
          )}
        </span>
      </div>
      <br />
      <div>
        <RatingButton text={'재밌는 과정'} />
      </div>
      <Button text={'완료'} onClickEvent={submitStarScore} />
    </div>
  );
};

export default SingleModalExitSurvey;
