import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabButton from '../components/button/TabButton';
import './Board.style.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { newInfoBoard, newQaBoard } from '../features/board/BoardSlice';
import Button from '../components/button/Button';

const BoardWritePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [isInfo, setIsInfo] = useState(true);

  const setInfo = () => {
    setIsInfo(true);
  };

  const setQa = () => {
    setIsInfo(false);
  };

  console.log(isInfo);

  const BoardCreate = () => {
    const newBoard = {
      title,
      member_id: '1',
      writer: '나중에 수정해야 함',
      content,
    };
    if (isInfo) {
      dispatch(newInfoBoard(newBoard));
    } else {
      dispatch(newQaBoard(newBoard));
    }
    // 네비게이트로 새로 생성한 글로 이동하게 하기
    setTitle('');
    setContent('');
  };

  return (
    <div className="container">
      <div className="go-back" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon="fa-solid fa-circle-chevron-left" />
        <span>작성 취소</span>
      </div>
      <form className="write-form">
        <div className="form-header">
          <h3>글쓰기</h3>
          <Button text={'등록'} onClickEvent={BoardCreate} />
        </div>
        <hr />
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
        <br />
        <input
          className="input-title"
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="input-content"
          placeholder="내용을 입력하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
    </div>
  );
};

export default BoardWritePage;
