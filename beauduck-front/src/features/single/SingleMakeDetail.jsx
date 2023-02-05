import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import SingleMakeSub from './SingleMakeSub';

const SingleMakeDetail = ({ getMakeupList }) => {
  const [main, setMain] = useState('skin');

  const selectMain = (val) => {
    setMain(val);
  };

  const sub = () => {
    switch (main) {
      case 'skin':
        return [
          '',
          ['선크림', 'suncream'],
          ['파운데이션', 'foundation'],
          ['파우더', 'powder'],
        ];
      case 'eyebrow':
        return [
          '',
          ['아이브로우', 'eyebrow'],
          ['브로우 마스카라', 'browmascara'],
        ];
      case 'eye':
        return [
          '',
          ['아이섀도우', 'eyeshadow'],
          ['아이라이너', 'eyeliner'],
          ['뷰러', 'curler'],
          ['마스카라', 'mascara'],
        ];
      case 'conture':
        return [
          '',
          ['쉐딩', 'shading'],
          ['블러셔', 'blusher'],
          // ['하이라이터', 'highlighter'],
        ];
      case 'lip':
        return [
          '',
          ['립스틱', 'lipstick'],
          ['틴트', 'tint'],
          ['립글로스', 'lipgloss'],
        ];
      default:
        return [];
    }
  };

  const [skinSubData] = useState([]);
  const [eyebrowSubData] = useState([]);
  const [eyeSubData] = useState([]);
  const [contureSubData] = useState([]);
  const [lipSubData] = useState([]);

  const subList = () => {
    switch (main) {
      case 'skin':
        return skinSubData;
      case 'eyebrow':
        return eyebrowSubData;
      case 'eye':
        return eyeSubData;
      case 'conture':
        return contureSubData;
      case 'lip':
        return lipSubData;
      default:
        return [];
    }
  };

  const getMainData = () => {
    skinSubData.filter((data) => {
      return data !== null && data !== undefined && data !== '';
    });
    if (skinSubData.length === 0) {
      setMain('skin');
      return;
    }

    eyebrowSubData.filter((data) => {
      return data !== null && data !== undefined && data !== '';
    });
    if (eyebrowSubData.length === 0) {
      setMain('eyebrow');
      return;
    }

    eyeSubData.filter((data) => {
      return data !== null && data !== undefined && data !== '';
    });
    if (eyeSubData.length === 0) {
      setMain('eye');
      return;
    }

    contureSubData.filter((data) => {
      return data !== null && data !== undefined && data !== '';
    });
    if (contureSubData.length === 0) {
      setMain('conture');
      return;
    }

    lipSubData.filter((data) => {
      return data !== null && data !== undefined && data !== '';
    });
    if (lipSubData.length === 0) {
      setMain('lip');
      return;
    }

    const makeupMainList = [
      {
        step: 'skin',
        makeupMiddleList: skinSubData,
      },
      {
        step: 'eyebrow',
        makeupMiddleList: eyebrowSubData,
      },
      {
        step: 'eye',
        makeupMiddleList: eyeSubData,
      },
      {
        step: 'conture',
        makeupMiddleList: contureSubData,
      },
      {
        step: 'lip',
        makeupMiddleList: lipSubData,
      },
    ];
    getMakeupList(makeupMainList);
  };

  return (
    <div className="makeup-form-second">
      <div className="main-div">
        <img
          src="/images/makeup/main_skin.png"
          alt="skin"
          id="skin"
          onClick={() => selectMain('skin')}
          className={'main-img' + (main === 'skin' ? '_selected' : '')}
        />
        <FontAwesomeIcon
          className="next-makeup-icon"
          icon="fa-solid fa-angle-right"
        />
        <img
          src="/images/makeup/main_eyebrow.png"
          alt="eyebrow"
          id="eyebrow"
          onClick={() => selectMain('eyebrow')}
          className={'main-img' + (main === 'eyebrow' ? '_selected' : '')}
        />
        <FontAwesomeIcon
          className="next-makeup-icon"
          icon="fa-solid fa-angle-right"
        />
        <img
          src="/images/makeup/main_eye.png"
          alt="eye"
          id="eye"
          onClick={() => selectMain('eye')}
          className={'main-img' + (main === 'eye' ? '_selected' : '')}
        />
        <FontAwesomeIcon
          className="next-makeup-icon"
          icon="fa-solid fa-angle-right"
        />
        <img
          src="/images/makeup/main_conture.png"
          alt="conture"
          id="conture"
          onClick={() => selectMain('conture')}
          className={'main-img' + (main === 'conture' ? '_selected' : '')}
        />
        <FontAwesomeIcon
          className="next-makeup-icon"
          icon="fa-solid fa-angle-right"
        />
        <img
          src="/images/makeup/main_lip.png"
          alt="lip"
          id="lip"
          onClick={() => selectMain('lip')}
          className={'main-img' + (main === 'lip' ? '_selected' : '')}
        />
      </div>
      <SingleMakeSub main={main} sub={sub()} makeupMiddleList={subList()} />
      <button className="makeup-bottom-btn" onClick={getMainData}>
        완성
      </button>
    </div>
  );
};

export default SingleMakeDetail;
