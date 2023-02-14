import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMakeupDetail,
  selectMain,
  setMakeupId,
  startMakeup,
} from './SingleSlice';
import { useState } from 'react';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SingleModalInfo = ({ makeupId, isToggleInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { makeupDetail } = useSelector((state) => state.single);

  useEffect(() => {
    dispatch(getMakeupDetail(makeupId));
  }, [dispatch]);

  let category = [];
  const [isSelected1, setIsSelected1] = useState(false);
  const [isSelected2, setIsSelected2] = useState(false);
  const [isSelected3, setIsSelected3] = useState(false);
  const [isSelected4, setIsSelected4] = useState(false);
  const [isSelected5, setIsSelected5] = useState(false);

  const main = ['skin', 'eyebrow', 'eye', 'conture', 'lip'];

  const selectSubmit = () => {

    if (!isSelected1 && !isSelected2 && !isSelected3 && !isSelected4 && !isSelected5) {
      Swal.fire(
        "모든 과정이 선택되지 않았습니다.",
        "최소 하나의 과정을 선택해야 합니다.",
        "error"
      )
      return
    }

    for (let i = 1; i < 6; i++) {
      if (eval(`isSelected${i}`)) {
        category.push(main[i - 1]);
      }
    }
    const selectedStep = {
      mainList: category,
    };

    const payload = {
      makeupId,
      selectedStep,
    };

    dispatch(selectMain(category));
    dispatch(startMakeup(payload)).then((res) => {
      dispatch(setMakeupId(makeupId));
      navigate('/single/mode', { replace: true });
    });
  };

  return (
    <div className="makeup-detail">
      <div className="makeup-detail-top" onClick={() => isToggleInfo()}>
        <div className="makeup-detail-left">
          <h3>{makeupDetail.title}</h3>
          <div className="star-info">
            <FontAwesomeIcon className="star-icon" icon="fa-solid fa-star" />
            <p>{makeupDetail.score}</p>
            <p>({makeupDetail.count})</p>
          </div>
          <p className="makeup-duration">
            소요시간 : {makeupDetail.duration} 분
          </p>
          <p className="makeup-content">{makeupDetail.content}</p>
        </div>
        <div className="makeup-detail-right">
          <img src={makeupDetail.img} alt="" />
        </div>
      </div>
      <div className="select-course">
        <button
          onClick={() => setIsSelected1(!isSelected1)}
          className={isSelected1 ? 'selected' : ''}
        >
          피부
        </button>
        <button
          onClick={() => setIsSelected2(!isSelected2)}
          className={isSelected2 ? 'selected' : ''}
        >
          눈썹
        </button>
        <button
          onClick={() => setIsSelected3(!isSelected3)}
          className={isSelected3 ? 'selected' : ''}
        >
          눈
        </button>
        <button
          onClick={() => setIsSelected4(!isSelected4)}
          className={isSelected4 ? 'selected' : ''}
        >
          윤곽
        </button>
        <button
          onClick={() => setIsSelected5(!isSelected5)}
          className={isSelected5 ? 'selected' : ''}
        >
          립
        </button>
      </div>
      <p className="describe-text">*진행하려는 과정을 선택하세요.</p>
      <Button
        text={'시작하기'}
        onClickEvent={selectSubmit}
        btnStyle={'start-btn'}
      />
    </div>
  );
};

export default SingleModalInfo;
