import Color from '../../components/color/Color';
import colorSelector from '../../assets/color-circle.png';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBtnStateCreate, setBtnStateUpdate } from './SingleSlice';
import { useEffect } from 'react';

const SingleMakeSub = ({ main, sub, makeupMiddleList }) => {
  const color_course = ['eyeshadow', 'blusher', 'lipstick', 'tint', 'lipgloss'];
  const dispatch = useDispatch();
  const subRef = useRef();
  const contentRef = useRef();
  const imgRef = useRef();

  const [step, setStep] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('');
  const [img, setImg] = useState('');

  const { btnState } = useSelector((state) => state.single);

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

  // 색상 선택
  const [onToggleColor, setOnToggleColor] = useState(false);

  const colorChange = (color) => {
    setColor(color);
  };

  const [idx, setIdx] = useState(-1);

  //소분류 생성
  const submitSubMakeup = () => {
    if (!step) {
      subRef.current.focus();
      return;
    }
    if (!content) {
      contentRef.current.focus();
      return;
    }

    const subData = {
      step,
      content,
      colorCode: color,
      img,
    };

    imgRef.current.value = '';

    const idx = makeupMiddleList.push(subData) - 1;

    const subImg = document.createElement('img');
    subImg.setAttribute('src', `/images/makeup/sub/sub_${step}.png`);
    subImg.setAttribute('alt', step);
    subImg.setAttribute('id', `subImg_${idx}`);
    subImg.setAttribute('value', idx);
    subImg.setAttribute('class', 'sub-img');
    subImg.addEventListener('click', () => getSubData(idx));

    const subBox = document.getElementById(`sub-${main}`);
    subBox.appendChild(subImg);

    setStep('');
    setContent('');
    setColor('');
    setImg('');
  };

  // 소분류 수정
  const updateSubMakeup = () => {
    if (!step) {
      subRef.current.focus();
      return;
    }
    if (!content) {
      contentRef.current.focus();
      return;
    }

    makeupMiddleList[idx].step = step;
    makeupMiddleList[idx].content = content;
    makeupMiddleList[idx].colorCode = color;
    makeupMiddleList[idx].img = img;

    const subImg = document.getElementById(`subImg_${idx}`);
    subImg.setAttribute('src', `/images/makeup/sub/sub_${step}.png`);
    subImg.setAttribute('alt', step);

    setIdx(-1);

    setStep('');
    setContent('');
    setColor('');
    setImg('');
    imgRef.current.value = '';
    dispatch(setBtnStateCreate());
  };

  // 수정할 때 폼에 기존 데이터 넣어주기
  const getSubData = (idx) => {
    dispatch(setBtnStateUpdate());

    const subData = makeupMiddleList[idx];
    setIdx(idx);

    setStep(subData.step);
    setContent(subData.content);
    setColor(subData.colorCode);
    setImg(subData.img);
  };

  // 소분류 삭제
  const removeSubMakeup = () => {
    makeupMiddleList[idx] = '';
    console.log(makeupMiddleList);

    const subBox = document.getElementById(`sub-${main}`);
    const removeSubImg = document.getElementById(`subImg_${idx}`);
    subBox.removeChild(removeSubImg);

    setIdx(-1);

    setStep('');
    setContent('');
    setColor('');
    setImg('');
    imgRef.current.value = '';
    dispatch(setBtnStateCreate());
  };

  useEffect(() => {
    if (!btnState) {
      setStep('');
      setContent('');
      setColor('');
      setImg('');
    }
  }, [btnState]);

  return (
    <div className="sub-div">
      <div id="sub-sequence">
        <div
          id="sub-skin"
          className={['sub-list', main === 'skin' ? 'step-selected' : ''].join(
            ' ',
          )}
        ></div>
        <div
          id="sub-eyebrow"
          className={[
            'sub-list',
            main === 'eyebrow' ? 'step-selected' : '',
          ].join(' ')}
        ></div>
        <div
          id="sub-eye"
          className={['sub-list', main === 'eye' ? 'step-selected' : ''].join(
            ' ',
          )}
        ></div>

        <div
          id="sub-conture"
          className={[
            'sub-list',
            main === 'conture' ? 'step-selected' : '',
          ].join(' ')}
        ></div>

        <div
          id="sub-lip"
          className={['sub-list', main === 'lip' ? 'step-selected' : ''].join(
            ' ',
          )}
        ></div>
      </div>
      <div className="sub-form">
        <div className="sub-div-first">
          <select
            ref={subRef}
            value={step}
            onChange={(e) => setStep(e.target.value)}
          >
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
        <textarea
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
          ref={imgRef}
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />
        {!btnState ? (
          <button type="button" className="ok-btn" onClick={submitSubMakeup}>
            완료
          </button>
        ) : (
          <>
            <button
              type="button"
              className="update-btn"
              onClick={updateSubMakeup}
            >
              수정
            </button>
            <button
              type="button"
              className="remove-btn"
              onClick={removeSubMakeup}
            >
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleMakeSub;
