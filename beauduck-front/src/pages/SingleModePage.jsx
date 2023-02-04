import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FacemeshFeature from '../features/facemesh/FacemeshFeature';
import duck from '../assets/duck1.jpg';
import SingleModeSequence from '../features/single/SingleModeSequence';
import { useState } from 'react';
import ExitModal from '../components/modal/ExitModal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const SingleModePage = () => {
  const nowMakeup = [
    {
      step: 'skin',
      makeupMiddleList: [
        {
          step: 'suncream',
          content:
            '잘 발라주세여 챱챱챱챱챱챱챱챱챱챠챠챠챠챠챠챠아아아아아나나나나나나마마마마마마마마맘마ㅏ바바ㅏ바밥ㄴㄴ안아지ㅏㅣㅏ이나이나이ㅏㅣ아니아니ㅏ이나ㅣ아니아ㅣ나이나ㅣ아니아ㅣㄴ아니아ㅣㄴ아니앙이ㅣ이ㅐ',
          colorCode: '',
          img: '',
        },
        {
          step: 'foundation',
          content: '적정량을 덜어서 챱챱',
          colorCode: '',
          img: '',
        },
      ],
    },
    {
      step: 'eyebrow',
      makeupMiddleList: [
        {
          step: 'eyebrow',
          content: '슥샥슥샥',
          colorCode: '',
          img: '',
        },
      ],
    },
    {
      step: 'eye',
      makeupMiddleList: [
        {
          step: 'eyeshadow',
          content: '파란색 아이섀도우를 눈 위에 슥샥슥샥',
          colorCode: '#0000FF',
          img: '',
        },
        {
          step: 'eyeliner',
          content: '아이라이너는 길고 두껍게^^',
          colorCode: '',
          img: '',
        },
      ],
    },
    {
      step: 'conture',
      makeupMiddleList: [
        {
          step: 'shading',
          content: '얼굴을 반토막 내보자고',
          colorCode: '',
          img: '',
        },
      ],
    },
    {
      step: 'lip',
      makeupMiddleList: [
        {
          step: 'lipstick',
          content: '한번만 샥샥',
          colorCode: '#C2185B',
          img: '',
        },
      ],
    },
  ];

  const navigate = useNavigate();
  const { mainList } = useSelector((state) => state.single);
  // const { nowMakeup } = useSelector((state) => state.single);
  const [isExit, setIsExit] = useState(false);

  const [isSkin, setIsSkin] = useState(false);
  const [isEyebrow, setIsEyebrow] = useState(false);
  const [isEye, setIsEye] = useState(false);
  const [isConture, setIsConture] = useState(false);
  const [isLip, setIsLip] = useState(false);

  const [nowMain, setNowMain] = useState('');
  const [nowStep, setNowStep] = useState([]);
  const [FistStep, setFirstStep] = useState([]);

  const [makeupList] = useState([]);
  // let stepLength = 0; // 진행바에 사용
  const [stepLength, setStepLength] = useState(0);

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

    // console.log('nowMain', nowMain);
    // console.log('nowStep', nowStep);
    // console.log('makeupList', makeupList);
    setFirstStep(nowStep);
  }, []);

  useEffect(() => {
    setStepLength(makeupList.length);
  }, [makeupList]);

  const [idx, setIdx] = useState(0);

  const goBefore = () => {
    if (idx > 0) {
      setIdx(idx - 1);
    }
  };

  const goNext = () => {
    if (idx < stepLength) {
      setIdx(idx + 1);
    }
  };

  useEffect(() => {
    setNowMain(makeupList[idx][0]);
    setNowStep(makeupList[idx][1]);
    console.log('next', idx);
    console.log('next', nowMain);
    console.log('next', nowStep);
  }, [idx]);

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
        {/* <img src={duck} alt="예시 이미지" className="sample-img" /> */}
        <br />
        {/* <span className="color-circle">g</span> */}
      </div>
      <div className="center-div">
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
        <FacemeshFeature />
      </div>
      <div className="right-div"></div>
    </div>
  );
};
export default SingleModePage;
