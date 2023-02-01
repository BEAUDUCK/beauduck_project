import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';
import TabButton from '../components/button/TabButton';
import BoardList from '../features/board/BoardList';
import {
  getAllList,
  getInfoList,
  getQaList,
} from '../features/board/BoardSlice';

const BoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllList());
  }, [dispatch]);

  const { infoList, qaList } = useSelector((state) => state.board);

  console.log('info', infoList);
  console.log('qa', qaList);

  const [nowList, setNowList] = useState(infoList);
  const [isInfo, setIsInfo] = useState(true);

  const setInfo = () => {
    setIsInfo(true);
    setNowList(infoList);
  };

  const setQa = () => {
    setIsInfo(false);
    setNowList(qaList);
  };

  // console.log('dd', nowList);

  const goToWrite = () => {
    navigate('/board/write');
  };

  return (
    <div className="container">
      <h1 className="board-name">
        <span>쑥덕</span>
        <span>쑥덕</span>
      </h1>
      <p>자유롭게 정보를 공유하고 질문을 등록하세요.</p>
      <div className="board-tab">
        <span>
          <TabButton
            text={'정보게시판'}
            onClick={setInfo}
            addClass={isInfo && 'selected'}
          />
          <TabButton
            text={'질문게시판'}
            onClick={setQa}
            addClass={!isInfo && 'selected'}
          />
        </span>
        <span>
          <span>
            <Button text={'글쓰기'} onClickEvent={goToWrite} />
          </span>
        </span>
      </div>
      {/* 보내주는 리스트를 다르게 함 */}
      <BoardList allList={isInfo ? infoList : qaList} isInfo={isInfo} />
      {/* <BoardList allList={nowList} /> */}
    </div>
  );
};

export default BoardPage;
