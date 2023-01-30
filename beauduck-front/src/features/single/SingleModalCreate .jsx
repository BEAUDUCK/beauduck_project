import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/button/Button';
import colorSelector from '../../assets/color-circle.png';
import { useState } from 'react';
import SingleModalCreateMain from './SingleModalCreateMain';

const SingleModalCreate = () => {
  // 색상 선택
  const [onToggleColor, setOnToggleColor] = useState(false);
  const [color, setColor] = useState('#fff');

  const colorChange = (color) => {
    setColor(color);
  };

  // + 버튼으로 새로운 서브 항목 추가하기 (왤케 어려움..)
  const addSubs = () => {
    const newSub = document.createElement('div');
    newSub.classList.add('sub-div');

    // + 버튼
    const plus = document.createElement('i');
    plus.innerHTML = '&#x2b';
    plus.classList.add('fa-solid', 'fa-plus', 'plus-mark', 'plus-mark-added');
    plus.addEventListener('click', addSubs);

    const newForm = document.createElement('form');
    const subDivFirst = document.createElement('div');
    subDivFirst.classList.add('sub-div-first');

    // 세부항목 선택 (셀렉트 박스)
    const seletor = document.createElement('select');
    const option1 = document.createElement('option');
    option1.setAttribute('value', 1);
    option1.innerText = '선크림';
    const option2 = document.createElement('option');
    option2.setAttribute('value', 2);
    option2.innerText = '파운데이션';
    const option3 = document.createElement('option');
    option3.setAttribute('value', 3);
    option3.innerText = '쿠션';
    const option4 = document.createElement('option');
    option4.setAttribute('value', 4);
    option4.innerText = '파우더';
    seletor.append(option1, option2, option3, option4);

    // 색상 선택
    const colorDiv = document.createElement('div');

    const colored = document.createElement('i');
    colored.innerHTML = '&#xf043';
    colored.classList.add('fa-solid', 'fa-droplet', 'selected-color');

    const colorImg = document.createElement('img');
    colorImg.setAttribute('src', colorSelector);
    colorImg.setAttribute('alt', 'color');
    colorImg.setAttribute('class', 'color-selector');
    // colorImg.addEventListener('click', setOnToggleColor(!onToggleColor));
    colorDiv.append(colored, colorImg);
    // colorDiv.innerHTML =
    //   '{onToggleColor && <Color propFunction={colorChange} />}';

    subDivFirst.append(seletor, colorDiv);

    // 상세설명
    const detail = document.createElement('input');
    detail.setAttribute('type', 'text');
    detail.setAttribute('class', 'add-sub-text');
    detail.setAttribute('placeholder', '해당 과정에 대한 설명을 적어주세요');

    // 파일 선택
    const fileUpload = document.createElement('input');
    fileUpload.setAttribute('type', 'file');
    fileUpload.setAttribute('id', 'file');
    fileUpload.setAttribute('accept', 'image/*');

    newForm.append(subDivFirst, detail, fileUpload);
    newSub.append(plus, newForm);

    // 피부화장 div 하위에 추가
    const addSkin = document.getElementById('add-skin-sub');
    addSkin.append(newSub);
  };

  return (
    <div className="makeup-create-modal">
      <div className="modal-header">
        <p></p>
        <h3>새 메이크업 만들기</h3>
        <FontAwesomeIcon icon="xmark" className="xmark" />
      </div>
      <div className="makeup-form">
        <div className="makeup-element">
          <label htmlFor="title" className="total-label">
            이름
          </label>
          <input type="text" id="title" className="total-input" />
        </div>
        <div className="makeup-element">
          <label htmlFor="content" className="total-label">
            내용
          </label>
          <textarea
            className={['input-content', 'total-input'].join(' ')}
            type="text"
            id="content"
            maxLength={50}
          />
        </div>
        <div className="makeup-element">
          <label htmlFor="mainImg" className="total-label">
            대표사진
          </label>
          <input
            className="main-img"
            type="file"
            id="mainImg"
            accept="image/*"
          />
        </div>
        <div className="makeup-element">
          <label htmlFor="time" className="total-label">
            소요시간
          </label>
          <input className="input-time" type="number" id="time" />
          <p>분</p>
        </div>
        {/* 메이크업 과정 */}
        <div className="makeup-process">
          <SingleModalCreateMain main={'피부'} />
        </div>
        <Button text={'완료'} />
      </div>
    </div>
  );
};

export default SingleModalCreate;
