import './Board.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { newInfoBoard, newQaBoard } from '../features/board/BoardSlice';
import TabButton from '../components/button/TabButton';
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

  const { memberId, name } = useSelector((state) => state.member);

  const BoardCreate = async () => {
    const newBoard = {
      active: true,
      // active 와 is_active...
      title,
      memberEntity: {
        memberId,
      },
      writer: name,
      content,
    };

    console.log('newBoard', newBoard);
    if (isInfo) {
      dispatch(newInfoBoard(newBoard)).then((res) => {
        const newBoardId = res.payload;
        navigate(`/board/info/${newBoardId}`);
      });
    } else {
      dispatch(newQaBoard(newBoard)).then((res) => {
        const newBoardId = res.payload;
        navigate(`/board/qna/${newBoardId}`);
      });
    }
  };

  return (
    <div className="container">
      <div className="go-back" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon="fa-solid fa-circle-chevron-left" />
        <span>작성 취소</span>
      </div>
      <div className="write-form">
        <div className="form-header">
          <h3>글쓰기</h3>
          <Button type="button" text={'등록'} onClickEvent={BoardCreate} />
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
      </div>
    </div>
  );
};

export default BoardWritePage;
