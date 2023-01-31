import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react';
import SingleModalCreateSub from './SingleModalCreateSub';
// import plusIcon from '../../assets/icon/plus.png';
// import minusIcon from '../../assets/icon/minus.png';

export const AddComponent = ({ addChild, children }) => {
  return (
    <>
      <FontAwesomeIcon
        icon="fa-solid fa-plus"
        onClick={addChild}
        className="plus-mark"
        id="plus-icon"
      />
      {/* <img src={plusIcon} alt="plus" className="plus-mark" />
        <img src={minusIcon} alt="minus" className="minus-mark" /> */}
      {children}
    </>
  );
};

const SingleModalCreateMain = ({ main, getSubAllData }) => {
  const sub = () => {
    if (main[0] === '피부') {
      return [
        '',
        ['선크림', 'suncream'],
        ['파운데이션', 'foundation'],
        ['쿠션', 'cushion'],
        ['파우더', 'powder'],
      ];
    } else if (main[0] === '눈썹') {
      return [
        '',
        ['아이브로우', 'eyebrow'],
        ['섀도우', 'shadow'],
        ['브로우 마스카라', 'browmascara'],
      ];
    } else if (main[0] === '눈') {
      return [
        '',
        ['아이섀도우', 'eyeshadow'],
        ['아이라이너', 'eyeliner'],
        ['마스카라', 'mascara'],
      ];
    } else if (main[0] === '윤곽') {
      return [
        '',
        ['쉐딩', 'shading'],
        ['블러셔', 'blusher'],
        ['하이라이터', 'highlighter'],
      ];
    } else if (main[0] === '입술') {
      return [
        '',
        ['립스틱', 'lipstic'],
        ['틴트', 'tint'],
        ['립글로스', 'lipgloss'],
      ];
    }
  };
  const [numChild, setNumChild] = useState(1);

  const children = [];

  const onDeleteChild = () => {
    if (numChild > 1) {
      setNumChild(numChild - 1);
    }
  };

  const makeupMiddleList = [];

  const getSubData = (subData) => {
    makeupMiddleList.push(subData);
    getSubAllData({ makeupMiddleList, main });
  };

  for (let i = 0; i < numChild; i += 1) {
    children.push(
      <SingleModalCreateSub
        sub={sub()}
        idx={i}
        key={i}
        getSubData={getSubData}
        deleteChild={onDeleteChild}
      />,
    );
  }

  const onAddChild = () => {
    if (numChild < 5) {
      setNumChild(numChild + 1);
    }
  };

  return (
    <div id="main-section" className="main-section">
      <span className="add-main-text">{main[0]}</span>
      <div id="sub-replace" className="sub-replace">
        <AddComponent addChild={onAddChild} children={children} />
      </div>
    </div>
  );
};

export default SingleModalCreateMain;
