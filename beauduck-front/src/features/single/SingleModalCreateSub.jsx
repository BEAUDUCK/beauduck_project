import Color from '../../components/color/Color';
import colorSelector from '../../assets/color-circle.png';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rejectedMakeup } from './SingleSlice';

const SingleModalCreateSub = ({ sub, getSubData, deleteChild }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('');
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
        <option key={i} value={sub[i][1]}>
          {sub[i][0]}
        </option>,
      );
    }
    return newOption;
  };

  const isSubmitted = useSelector((state) => state.single.completed);

  const submitData = () => {
    if (!step) {
      subRef.current.focus();
      dispatch(rejectedMakeup());
      return;
    }
    if (!content) {
      contentRef.current.focus();
      dispatch(rejectedMakeup());
      return;
    }
    const subData = {
      step,
      content,
      colorCode: color,
      img,
    };
    return subData;
  };

  if (isSubmitted) {
    const sub = submitData();
    getSubData(sub);
  }

  const color_course = ['eyeshadow', 'blusher', 'lipstic', 'tint', 'lipgloss'];
  return (
    <>
      <div className="sub-div">
        <FontAwesomeIcon
          icon="fa-solid fa-minus"
          className="minus-mark"
          onClick={deleteChild}
        />
        <form>
          <div className="sub-div-first">
            <select ref={subRef} onChange={(e) => setStep(e.target.value)}>
              {renderingOption()}
            </select>
            {color_course.includes(step) && (
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
            )}
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
    </>
  );
};

export default SingleModalCreateSub;
