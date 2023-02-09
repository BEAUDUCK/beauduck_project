import './Single.style.scss';
import Banner from '../components/banner/Banner';
import Button from '../components/button/Button';
import BlackOut from '../components/blackout/BlackOut';
import SingleList from '../features/single/SingleList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getMakeupList,
  recommendMakeup,
  rejectedMakeup,
} from '../features/single/SingleSlice';
import SingleModalRecommend from '../features/single/SingleModalRecommend';
import SingelModalNoRecommend from '../features/single/SingleModalNoRecommend';
import SingleMake from '../features/single/SingleMake';
import Alert from '../components/modal/Alert';
import SinglePopular from '../features/single/SinglePopular';
import SingleRandom from '../features/single/SingleRandom';

const SinglePage = () => {
  const dispatch = useDispatch();
  const { makeupList, popularList } = useSelector((state) => state.single);
  // 최초에 메이크업 리스트 불러오기
  useEffect(() => {
    dispatch(getMakeupList());
  }, [dispatch]);

  // 추천 받기
  const [isRecommend, setIsRecommend] = useState(false);

  const { memberId } = useSelector((state) => state.member);
  const popRecommend = () => {
    dispatch(recommendMakeup(memberId));
    const popRecommend = () => {
      const payload = {
        id: memberId,
      };
      dispatch(recommendMakeup(payload));
      setIsRecommend(!isRecommend);
    };
  };

  // 새로운 메이크업 만들기
  const [isMake, setIsMake] = useState(false);
  const onToggleMake = () => {
    setIsMake(!isMake);
    dispatch(rejectedMakeup());
  };

  const [isFinish, setIsFinish] = useState(false);
  const onToggleFinish = () => {
    setIsFinish(!isFinish);
  };

  return (
    <div className="single-main">
      <button className="makeup-recommend-btn" onClick={popRecommend}>
        나에게 어울리는 메이크업 추천 받기
      </button>
      {/* 추천 받을 수 있는지 없는지 */}
      {isRecommend && <SingleModalRecommend popRecommend={popRecommend} />}
      {isRecommend && <BlackOut onClickEvent={popRecommend} />}
      {/* <SingelModalNoRecommend /> */}

      {/* <h2 className="single-h2">인기 메이크업</h2>
      <hr className="single-hr" /> */}
      <Button text={'만들기'} onClickEvent={onToggleMake} />
      {isMake && (
        <SingleMake
          onToggleMake={onToggleMake}
          onToggleFinish={onToggleFinish}
        />
      )}
      {isMake && <BlackOut onClickEvent={onToggleMake} />}
      {isFinish && (
        <Alert text={'메이크업이 완성되었덕'} onClickEvent={onToggleFinish} />
      )}
      {isFinish && <BlackOut onClickEvent={onToggleFinish} />}
      <SinglePopular modeList={popularList} />
      <div className="makeup-special">
        <div className="makeup-special-section1">
          <h1>
            나에게 맞는 <br /> 메이크업 추천 받기
          </h1>
          <p>나와 닮은 사람들은 어떤 메이크업을 할까?</p>
          <p>
            인공지능으로 얼굴을 분석하여 나와 가장 닮은 사람들의 메이크업을
            추천한다
          </p>
        </div>
        <div className="makeup-special-section2">
          <h1>RANDOM PICK</h1>
          <SingleRandom />
        </div>
      </div>
      <SingleList modeList={makeupList} />
    </div>
  );
};

export default SinglePage;
