import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BlackOut from '../components/blackout/BlackOut';
import Button from '../components/button/Button';
import ExitModal from '../components/modal/ExitModal';
import BoardAnswerCreate from '../features/board/BoardAnswerCreate';
import BoardAnswerList from '../features/board/BoardAnswerList';
import {
  getQaBoard,
  removeQaBoard,
  updateQaBoard,
} from '../features/board/BoardSlice';

const BoardQnAPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nowBoard, commentList } = useSelector((state) => state.board);

  const titleRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    dispatch(getQaBoard(id));
  }, [dispatch, id]);

  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState(nowBoard.title);
  const [content, setContent] = useState(nowBoard.content);

  const { memberId } = useSelector((state) => state.member);

  const onToggleUpdate = () => {
    setTitle(nowBoard.title);
    setContent(nowBoard.content);
    setIsUpdate(!isUpdate);
  };

  const updateBoard = () => {
    if (!title) {
      titleRef.current.focus();
      return;
    }
    if (!content) {
      contentRef.current.focus();
      return;
    }

    const updatedBoard = {
      title,
      content,
      memberEntity: {
        memberId: nowBoard.memberId,
      },
      writer: nowBoard.writer,
    };

    const payload = {
      updatedBoard,
      boardId: id,
    };

    dispatch(updateQaBoard(payload));
    setIsUpdate(!isUpdate);
  };

  const [isRemove, setIsRemove] = useState(false);
  const onToggleRemove = () => {
    setIsRemove(!isRemove);
  };

  const removeBoard = () => {
    dispatch(removeQaBoard(id));
    navigate('/board'); // board 메인으로 라우팅
  };

  return (
    <div className={['container', 'container-colored'].join(' ')}>
      <div className="qna-board">
        <div className="alpha-mark">Q</div>
        <div className="board-qa-title">
          {!isUpdate ? (
            <h1>{nowBoard?.title}</h1>
          ) : (
            <input
              className="board-qa-title-input"
              type="text"
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
        </div>
        {memberId === nowBoard.memberId && (
          <div>
            {!isUpdate ? (
              <Button
                onClickEvent={onToggleUpdate}
                text={'수정'}
                btnStyle={'board-update'}
              />
            ) : (
              <Button
                onClickEvent={updateBoard}
                text={'완료'}
                btnStyle={'board-update'}
              />
            )}
            {!isUpdate ? (
              <Button
                onClickEvent={onToggleRemove}
                text={'삭제'}
                btnStyle={'board-remove'}
              />
            ) : (
              <Button
                onClickEvent={onToggleUpdate}
                text={'취소'}
                btnStyle={'board-remove'}
              />
            )}
            {isRemove && (
              <ExitModal
                title={'정말로 삭제하시겠습니까?'}
                content={'삭제한 게시글은 되돌릴 수 없습니다.'}
                btnText={'삭제'}
                onClickEvent={removeBoard}
                xmarkClickEvent={onToggleRemove}
              />
            )}
          </div>
        )}
        {isRemove && <BlackOut onClickEvent={onToggleRemove} />}
        <div className="user-box">
          <button className="img-replace" />
          <div className="user-text">
            <p>{nowBoard?.writer}</p>
            <div>
              <span>{nowBoard?.created_date}</span>
              <span>조회</span>
              <span>{nowBoard?.count}</span>
            </div>
          </div>
        </div>
        <div className="board-content">
          {!isUpdate ? (
            <p>{nowBoard?.content}</p>
          ) : (
            <textarea
              className="board-qa-content-input"
              value={content}
              ref={contentRef}
              onChange={(e) => setContent(e.target.value)}
            />
          )}
        </div>
      </div>
      <BoardAnswerList commentList={commentList} boardId={id} />
      <BoardAnswerCreate boardId={id} />
    </div>
  );
};

export default BoardQnAPage;
