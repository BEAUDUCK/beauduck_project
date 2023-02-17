import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';
import TabButton from '../components/button/TabButton';
import BoardList from '../features/board/BoardList';
import { getAllList } from '../features/board/BoardSlice';
import Swal from 'sweetalert2';

const BoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllList());
  }, [dispatch]);

  const { memberId } = useSelector((state) => state.member);

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

  const goToWrite = () => {
    if (!memberId) {
      Swal.fire(
        "로그인이 필요한 서비스 입니다.",
        "로그인 페이지로 이동합니다.",
        "warning"
      )
      return (
        <>
          {/* 로그인 모달창 이동 */}
        </>
      )
    }
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
          {memberId !== '' &&
            (memberId !== undefined && (
              <span>
                <Button text={'글쓰기'} onClickEvent={goToWrite} btnStyle={"board-btn"} />
              </span>
            ))}
        </span>
      </div>
      <BoardList allList={isInfo ? infoList : qaList} isInfo={isInfo} />
    </div>
  );
};

export default BoardPage;
