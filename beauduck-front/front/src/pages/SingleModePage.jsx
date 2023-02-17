import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FacemeshFeature from '../features/facemesh/FacemeshFeature';
import SingleModeSequence from '../features/single/SingleModeSequence';
import { useState, useEffect, useRef } from 'react';
import ExitModal from '../components/modal/ExitModal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
import Alert from '../components/modal/Alert';
import Button from '../components/button/Button';
import textBack from '../assets/textBack.png';

const SingleModePage = () => {
  const navigate = useNavigate();
  const { mainList } = useSelector((state) => state.single);
  const { nowMakeup, makeupDetail } = useSelector((state) => state.single);

  const [isExit, setIsExit] = useState(false);

  const [isSkin, setIsSkin] = useState(false);
  const [isEyebrow, setIsEyebrow] = useState(false);
  const [isEye, setIsEye] = useState(false);
  const [isConture, setIsConture] = useState(false);
  const [isLip, setIsLip] = useState(false);

  const [nowMain, setNowMain] = useState('');
  const [nowStep, setNowStep] = useState([]);

  const [makeupList] = useState([]);
  const [stepLength, setStepLength] = useState(0); // 몇단계?
  const [barLength, setBarLength] = useState(0); // 진행바 몇등분?
  const [location, setLocation] = useState(0); // 현재 바 길이

  useEffect(() => {
    if (mainList.includes('skin')) {
      setIsSkin(true);
    }
    if (mainList.includes('eyebrow')) {
      setIsEyebrow(true);
    }
    if (mainList.includes('eye')) {
      setIsEye(true);
    }
    if (mainList.includes('conture')) {
      setIsConture(true);
    }
    if (mainList.includes('lip')) {
      setIsLip(true);
    }

    for (let i = 0; i < mainList.length; i++) {
      if (mainList[i] === 'skin') {
        nowMakeup[i].makeupMiddleList.map((item) => {
          makeupList.push(['skin', item]);
        });
      } else if (mainList[i] === 'eyebrow') {
        nowMakeup[i].makeupMiddleList.map((item) => {
          makeupList.push(['eyebrow', item]);
        });
      } else if (mainList[i] === 'eye') {
        nowMakeup[i].makeupMiddleList.map((item) => {
          makeupList.push(['eye', item]);
        });
      } else if (mainList[i] === 'conture') {
        nowMakeup[i].makeupMiddleList.map((item) => {
          makeupList.push(['conture', item]);
        });
      } else if (mainList[i] === 'lip') {
        nowMakeup[i].makeupMiddleList.map((item) => {
          makeupList.push(['lip', item]);
        });
      }
    }
    setNowMain(makeupList[0][0]);
    setNowStep(makeupList[0][1]);
  }, []);

  useEffect(() => {
    setStepLength(makeupList.length);
    setBarLength(614 / (makeupList.length - 1));
  }, [makeupList]);

  const [nowIdx, setNowIdx] = useState(0);

  const goBefore = () => {
    if (nowIdx > 0) {
      setNowIdx(nowIdx - 1);
    } else {
      setIsFirst(true);
    }
  };

  const goNext = () => {
    if (nowIdx < stepLength - 1) {
      setNowIdx(nowIdx + 1);
    } else {
      setIsLast(true);
    }
  };

  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    setNowMain(makeupList[nowIdx][0]);
    setNowStep(makeupList[nowIdx][1]);
    setLocation(barLength * nowIdx);
    console.log('dsda', location);
  }, [nowIdx]);

  const finishMode = () => {
    navigate('/single/result', { replace: true });
  };

  const [isGuide, setIsGuide] = useState(false);
  const guideOnOff = () => {
    setIsGuide(!isGuide);
  };
  return (
    <div className="full-screen">
      <div className="left-div">
        <div className="out" onClick={() => setIsExit(!isExit)}>
          {isExit && (
            <ExitModal
              title={'정말 나가시겠습니까?'}
              content={'진행 중이던 세션은 자동으로 종료됩니다.'}
              btnText={'나가기'}
              onClickEvent={() => navigate('/single')}
            />
          )}
          <FontAwesomeIcon icon="fa-solid fa-circle-chevron-left" />
          <p>나가기</p>
        </div>
        <SingleModeSequence nowStep={nowStep} />
        {nowStep.colorCode ? (
          <div className="color-code-div">
            <p>사용 색상</p>
            <div
              className="color-rectangle"
              style={{ backgroundColor: `${nowStep?.colorCode}` }}
            ></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="center-div">
        <div className="main-img-div">
          {isSkin && (
            <img
              src="/images/makeup/main_skin.png"
              alt="skin"
              id="skin"
              className={
                'main-ing-img' + (nowMain === 'skin' ? 'selected' : '')
              }
            />
          )}
          {isSkin && (
            <FontAwesomeIcon
              className="next-makeup-icon"
              icon="fa-solid fa-angle-right"
            />
          )}
          {isEyebrow && (
            <img
              src="/images/makeup/main_eyebrow.png"
              alt="eyebrow"
              id="eyebrow"
              className={
                'main-ing-img' + (nowMain === 'eyebrow' ? 'selected' : '')
              }
            />
          )}
          {isEyebrow && (isEye || isConture) && (
            <FontAwesomeIcon
              className="next-makeup-icon"
              icon="fa-solid fa-angle-right"
            />
          )}
          {isEye && (
            <img
              src="/images/makeup/main_eye.png"
              alt="eye"
              id="eye"
              className={'main-ing-img' + (nowMain === 'eye' ? 'selected' : '')}
            />
          )}
          {isEye && isConture && (
            <FontAwesomeIcon
              className="next-makeup-icon"
              icon="fa-solid fa-angle-right"
            />
          )}
          {isConture && (
            <img
              src="/images/makeup/main_conture.png"
              alt="conture"
              id="conture"
              className={
                'main-ing-img' + (nowMain === 'conture' ? 'selected' : '')
              }
            />
          )}
          {isLip && (
            <FontAwesomeIcon
              className="next-makeup-icon"
              icon="fa-solid fa-angle-right"
            />
          )}
          {isLip && (
            <img
              src="/images/makeup/main_lip.png"
              alt="lip"
              id="lip"
              className={'main-ing-img' + (nowMain === 'lip' ? 'selected' : '')}
            />
          )}
        </div>
        <div className="progress-bar">
          <hr className="progress-hr" />
          <hr
            className="progress-hr"
            style={{
              backgroundColor: '#FFE27C',
              width: `${location}px`,
            }}
          />
          {makeupList.map((item, idx) => (
            <div
              className={[
                'progress-inside',
                nowIdx >= idx ? 'already' : '',
              ].join(' ')}
            ></div>
          ))}
        </div>
        <div className="center-cam">
          <FontAwesomeIcon
            icon="fa-solid fa-angle-left"
            className={['move', 'move-left'].join(' ')}
            onClick={goBefore}
          />
          <FontAwesomeIcon
            icon="fa-solid fa-angle-right"
            className={['move', 'move-right'].join(' ')}
            onClick={goNext}
          />
          <FacemeshFeature
            nowStep={nowStep.step}
            nowMain={nowMain}
            isGuide={isGuide}
          />
        </div>
        <Button
          text={isGuide ? '가이드 끄기' : '가이드 켜기'}
          onClickEvent={guideOnOff}
          btnStyle={'guide-btn'}
        />
      </div>
      <div className="right-div">
        <div className="right-detail">
          <img className="textBack" src={textBack} alt="" />
          <p>완성본</p>
          <img className="thumbnail" src={makeupDetail.img} alt="" />
        </div>
        <div className="right-detail">
          {nowStep.img ? (
            <>
              <img className="textBack" src={textBack} alt="" />
              <p>가이드</p>
              <img
                className="guide-img"
                src={nowStep?.img}
                alt={nowStep?.step}
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <button onClick={finishMode} className="finish-btn">
          종료하기
        </button>
      </div>
      {isFirst && (
        <Alert
          text={'첫 번째 단계입니다'}
          onClickEvent={() => setIsFirst(!isFirst)}
        />
      )}
      {isLast && (
        <Alert
          text={'마지막 단계입니다'}
          onClickEvent={() => setIsLast(!isLast)}
        />
      )}
    </div>
  );
};
export default React.memo(SingleModePage);
