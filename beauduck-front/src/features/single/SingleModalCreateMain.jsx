import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react';
import SingleModalCreateSub from './SingleModalCreateSub';

export const AddComponent = ({ addChild, children }) => {
  return (
    <>
      <FontAwesomeIcon
        icon="fa-solid fa-plus"
        onClick={addChild}
        className="plus-mark"
        id="plus-icon"
      />
      {children}
    </>
  );
};
const SingleModalCreateMain = ({ main }) => {
  const sub = () => {
    if (main === '피부') {
      return ['', '선크림', '파운데이션', '쿠션', '파우더'];
    } else if (main === '눈썹') {
      return ['', '아이브로우', '섀도우', '브로우 마스카라'];
    } else if (main === '눈') {
      return ['', '아이섀도우', '아이라이너', '마스카라'];
    } else if (main === '윤곽') {
      return ['', '쉐딩', '블러셔', '하이라이터'];
    } else if (main === '립') {
      return ['', '립스틱', '틴트', '립글로스'];
    }
  };
  const [numChild, setNumChild] = useState(1);

  const children = [];
  for (let i = 0; i < numChild; i += 1) {
    children.push(<SingleModalCreateSub sub={sub()} idx={i} key={i} />);
  }
  const onAddChild = () => {
    setNumChild(numChild + 1);
  };

  const subData = [];

  const getSubData = (data, idx) => {
    console.log('안녕');
    // subData.slice(idx - 1, 0, data);
  };

  return (
    <div id="main-section" className="main-section">
      <span className="add-main-text">{main}</span>
      <div id="sub-replace" className="sub-replace">
        <AddComponent addChild={onAddChild} children={children} />
      </div>
    </div>
  );
};

export default SingleModalCreateMain;
