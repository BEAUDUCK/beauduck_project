import Color from '../../components/color/Color';
import colorSelector from '../../assets/color-circle.png';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useRef } from 'react';

const SingleModalCreateSub = ({ sub, propFunction, idx }) => {
  const [subText, setSubText] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#fff');
  const [img, setImg] = useState('');

  // 색상 선택
  const [onToggleColor, setOnToggleColor] = useState(false);

  const colorChange = (color) => {
    setColor(color);
  };

  const subRef = useRef();
  const contentRef = useRef();

  // option 생성
  const renderingOption = () => {
    let newOption = [];
    for (let i = 0; i < sub.length; i++) {
      newOption.push(
        <option key={i} value={sub[i]}>
          {sub[i]}
        </option>,
      );
    }
    return newOption;
  };

  const submitData = () => {
    if (!subText) {
      subRef.current.focus();
    }
    if (!content) {
      contentRef.current.focus();
    }
    const subData = {
      text: subText,
      content,
      color_code: color,
      img,
    };
    propFunction(subData, idx);
  };

  //   useEffect(() => {
  //     return () => {
  //       submitData();
  //     };
  //   }, [submitData()]);

  return (
    <div className="sub-div">
      <form>
        <div className="sub-div-first">
          <select ref={subRef} onChange={(e) => setSubText(e.target.value)}>
            {renderingOption()}
          </select>
          <div>
            <FontAwesomeIcon
              icon="fa-solid fa-droplet"
              className="selected-color"
              style={{ color: color }}
            />
            <img
              src={colorSelector}
              alt="컬러"
              className="color-selector"
              onClick={() => setOnToggleColor(!onToggleColor)}
            />
          </div>
          {onToggleColor && <Color propFunction={colorChange} />}
        </div>
        <input
          ref={contentRef}
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="add-sub-text"
          placeholder="해당 과정에 대한 설명을 적어주세요"
        />
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />
      </form>
    </div>
  );
};

export default SingleModalCreateSub;
