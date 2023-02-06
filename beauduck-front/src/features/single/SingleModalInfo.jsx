import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMakeupDetail, selectMain, startMakeup } from './SingleSlice';
import { useState } from 'react';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';

// 메이크업 상세 조회 API
const SingleModalInfo = ({ makeupId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { makeup } = useSelector((state) => state.makeupDetail);
  useEffect(() => {
    dispatch(getMakeupDetail(makeupId));
  }, [dispatch, makeupId]);

  // 지금은 테스트 데이터 넣어놓음
  // const makeup = {
  //   id: 1,
  //   title: '데일리 메이크업',
  //   content: '일상생활에서 부담없이 할 수 있는 데일리 메이크업입니다.',
  //   duration: 30,
  //   score: 4.5,
  //   count: 120,
  //   img: 'https://i.pinimg.com/236x/00/23/13/0023139711735d03774be660adcad98c.jpg',
  // };

  let category = [];
  const [isSelected1, setIsSelected1] = useState(false);
  const [isSelected2, setIsSelected2] = useState(false);
  const [isSelected3, setIsSelected3] = useState(false);
  const [isSelected4, setIsSelected4] = useState(false);
  const [isSelected5, setIsSelected5] = useState(false);

  const main = ['skin', 'eyebrow', 'eye', 'conture', 'lip'];

  const selectSubmit = () => {
    for (let i = 1; i < 6; i++) {
      if (eval(`isSelected${i}`)) {
        category.push(main[i - 1]);
      }
    }
    const selectedStep = {
      makeupMainList: category,
    };

    dispatch(selectMain(category));
    dispatch(startMakeup(selectedStep));
    navigate('/single/mode', { replace: true });
  };

  return (
    <div className="makeup-detail">
      <div className="makeup-detail-top">
        <div className="makeup-detail-left">
          <h3>{makeup.title}</h3>
          <div className="star-info">
            <FontAwesomeIcon className="star-icon" icon="fa-solid fa-star" />
            <p>{makeup.score}</p>
            <p>({makeup.count})</p>
          </div>
          <p className="makeup-content">{makeup.content}</p>
          <p className="makeup-content">소요시간 : {makeup.duration} 분</p>
        </div>
        <div className="makeup-detail-right">
          <img src={makeup.img} alt="" />
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
      <Button text={'시작하기'} onClickEvent={selectSubmit} />
    </div>
  );
};

export default SingleModalInfo;
