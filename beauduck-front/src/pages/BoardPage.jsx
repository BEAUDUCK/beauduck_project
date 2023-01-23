import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';
import TabButton from '../components/button/TabButton';
import BoardList from '../features/board/BoardList';
import { getInfoList, getQaList } from '../features/board/BoardSlice';

const BoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { infoList } = useSelector((state) => state.infoList);
  // const { qaList } = useSelector((state) => state.qaList);

  useEffect(() => {
    // 처음에 info, qa 둘 다 받아오고 선택적으로 보여주는게 나을 듯
    // 버튼 바꿀 때마다 요청 보내기엔....
    // dispatch(getInfoList());
    // dispatch(getQaList());
  }, [dispatch]);

  const [isInfo, setIsInfo] = useState(true);

  const setInfo = () => {
    setIsInfo(true);
  };

  const setQa = () => {
    setIsInfo(false);
  };

  const allList = [
    {
      id: 1,
      title: '글1',
      member_id: 4,
      content: '내용내용',
      count: 4,
      like: 3,
    },
    {
      id: 2,
      title: '글2',
      member_id: 4,
      content: '내용내용',
      count: 4,
      like: 3,
    },
    {
      id: 3,
      title: '글3',
      member_id: 4,
      content: '내용내용',
      count: 4,
      like: 3,
    },
    {
      id: 4,
      title: '글4',
      member_id: 4,
      content: '내용내용',
      count: 4,
      like: 3,
    },
    {
      id: 5,
      title: '글5',
      member_id: 4,
      content: '내용내용',
      count: 4,
      like: 3,
    },
    {
      id: 6,
      title: '글6',
      member_id: 4,
      content: '내용내용',
      count: 4,
      like: 3,
    },
    {
      id: 7,
      title: '글7',
      member_id: 4,
      content: '내용내용',
      count: 4,
      like: 3,
    },
    {
      id: 8,
      title: '글8',
      member_id: 4,
      content: '내용내용',
      count: 4,
      like: 3,
    },
    {
      id: 9,
      title: '글9',
      member_id: 4,
      content: '내용내용',
      count: 4,
      like: 3,
    },
  ];

  const goToWrite = () => {
    navigate('/board/write');
  };

  return (
    <div className="container">
      <h1 className="board-name">쑥덕쑥덕</h1>
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
          <input type="text" />
          <span>
            <Button text={'글쓰기'} onClickEvent={goToWrite} />
          </span>
        </span>
      </div>
      {/* 보내주는 리스트를 다르게 함 */}
      {/* <BoardList allList={isInfo ? infoList : qaList} /> */}
      <BoardList allList={allList} />
    </div>
  );
};

export default BoardPage;
