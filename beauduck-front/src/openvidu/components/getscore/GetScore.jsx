import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const GetScore = ({ nowIdx, resultUsers }) => {
  const [beforeIdx, setBeforeIdx] = useState(0);
  const didMount = useRef(false);

  const [isClick, setIsClick] = useState(false);
  console.log('isClick', isClick);
  console.log('beforeIdx', beforeIdx);
  console.log('nowIdx', nowIdx);

  // 🦴 인덱스가 바뀌면 isClick을 false로 초기화
  useEffect(() => {
    if (didMount.current) {
      if (isClick) {
        resultUsers.current.personalResults.push(parseInt(1)); // 눌렀으면 1 추가
      } else {
        resultUsers.current.personalResults.push(parseInt(0)); // 안 눌렀으면 0 추가
      }
      console.log('resultUsers', resultUsers.current.personalResults);
      setIsClick(false);
    } else {
      didMount.current = true;
    }
  }, [nowIdx]);

  // 버튼 클릭 이벤트
  const selectGood = () => {
    setIsClick(true);
  };

  return (
    <>
      <button onClick={selectGood} className="select-button">
        good
      </button>
    </>
  );
};

export default React.memo(GetScore);
