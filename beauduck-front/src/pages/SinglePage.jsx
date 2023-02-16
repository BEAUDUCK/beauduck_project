import './Single.style.scss';
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
import SingleMake from '../features/single/SingleMake';
import Alert from '../components/modal/Alert';
import SinglePopular from '../features/single/SinglePopular';
import SingleRandom from '../features/single/SingleRandom';
import makeupCreate from '../assets/makeupCreate.png';
import miniDuck from '../assets/logo_no_back.png';
import aiPic from '../assets/ai.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import banner from '../assets/single_banner.gif';

const SinglePage = () => {
  const dispatch = useDispatch();
  const { makeupList, popularList } = useSelector((state) => state.single);
  // 최초에 메이크업 리스트 불러오기
  useEffect(() => {
    dispatch(getMakeupList());
  }, []);

  // 추천 받기
  const [isRecommend, setIsRecommend] = useState(false);

  const { memberId } = useSelector((state) => state.member);
  const popRecommend = () => {
    if (!memberId) {
      Swal.fire(
        '로그인이 필요한 서비스 입니다.',
        '로그인 페이지로 이동합니다.',
        'warning',
      );
      return <>{/* 로그인 모달창 이동 */}</>;
    }

    const payload = {
      id: memberId,
    };
    dispatch(recommendMakeup(payload));
    setIsRecommend(!isRecommend);
  };

  // 새로운 메이크업 만들기
  const [isMake, setIsMake] = useState(false);
  const onToggleMake = () => {
    if (!memberId) {
      Swal.fire(
        '로그인이 필요한 서비스 입니다.',
        '로그인 페이지로 이동합니다.',
        'warning',
      );
      return <>{/* 로그인 모달창 이동 */}</>;
    }
    setIsMake(!isMake);
    dispatch(rejectedMakeup());
  };

  const [isFinish, setIsFinish] = useState(false);
  const onToggleFinish = () => {
    setIsFinish(!isFinish);
  };

  return (
    <div className="single-main">
      <div className="single-banner-div">
        <img src={banner} alt="" className="single-banner" />
      </div>
      <div className="makeup-popular">
        <h1 className="best-text">BEST 10</h1>
        <SinglePopular modeList={popularList} />
      </div>

      <div className="makeup-special">
        <div className="makeup-special-section1">
          <div className="section1-create">
            <img src={makeupCreate} alt="" />
            <div>
              <h2>마음에 드는 메이크업이 없나요?</h2>
              <p>모든 메이크업 단계와 </p>
              <p>색감까지 내 마음대로 커스터마이징</p>
              <div>
                <Button
                  text={'메이크업 만들어보기'}
                  onClickEvent={onToggleMake}
                  btnStyle={'single-create-btn'}
                />
                <FontAwesomeIcon icon="fa-solid fa-circle-chevron-right" />
              </div>
            </div>
          </div>
          <div className="section1-random">
            <div className="random-header">
              <img src={miniDuck} alt="miniDuck" className="miniDuck" />
              <h1 className="random-h1-one">뷰덕 PICK !</h1>
              <h1 className="random-h1-two">TODAY'S MAKEUP</h1>
            </div>
            <SingleRandom />
          </div>
        </div>

        <div className="makeup-special-section2">
          <div className="section2-ai" id="section2-ai">
            <h1>나한테 찰떡인 메이크업 어디 없나?</h1>
            <p>AI가 내 얼굴을 분석하고</p>
            <p>직접 어울리는 메이크업을 추천해줘요!</p>
            <div className="section2-bottom">
              <div>
                <Button
                  btnStyle={'recommend-btn'}
                  onClickEvent={popRecommend}
                  text={'추천 받으러 가기'}
                />
                <FontAwesomeIcon icon="fa-solid fa-circle-chevron-right" />
              </div>
              <img src={aiPic} alt="" />
            </div>
          </div>
        </div>
        {/* 추천 받을 수 있는지 없는지 */}
        {isRecommend && <SingleModalRecommend popRecommend={popRecommend} />}
        {isRecommend && <BlackOut onClickEvent={popRecommend} />}

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
      </div>
      <div className="basic-makeup-list">
        <SingleList modeList={makeupList} />
      </div>
    </div>
  );
};

export default SinglePage;
