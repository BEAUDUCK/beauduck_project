import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BlackOut from '../components/blackout/BlackOut';
import Button from '../components/button/Button';
import ExitModal from '../components/modal/ExitModal';
import BoardCommentCreate from '../features/board/BoardCommentCreate';
import BoardCommentList from '../features/board/BoardCommentList';
import {
  getInfoBoard,
  RemoveInfoBoard,
  UpdateInfoBoard,
} from '../features/board/BoardSlice';
import board1 from "../assets/board/board1.png"

const BoardInfoPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nowBoard, commentList } = useSelector((state) => state.board);
  const { memberId } = useSelector((state) => state.member);

  const titleRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    dispatch(getInfoBoard(id));
  }, [dispatch, id]);

  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState(nowBoard?.title);
  const [content, setContent] = useState(nowBoard?.content);

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
    dispatch(UpdateInfoBoard(payload));
    setIsUpdate(!isUpdate);
  };

  const [isRemove, setIsRemove] = useState(false);
  const onToggleRemove = () => {
    setIsRemove(!isRemove);
  };

  const removeBoard = () => {
    dispatch(RemoveInfoBoard(id));
    navigate('/board', { replace: true }); // board 메인으로 라우팅
  };

  const date = nowBoard.createdDate + '';

  return (
    <div className={['container', 'container-colored'].join(' ')}>
      <div className="info-board">
        <div className="board-info-title">
          {!isUpdate ? (
            <h1>{nowBoard?.title}</h1>
          ) : (
            <input
              className="board-info-title-input"
              type="text"
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
        </div>
        {memberId == nowBoard.memberId && (
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
            {isRemove && <BlackOut onClickEvent={onToggleRemove} />}
          </div>
        )}
        <div className="user-box">
          <img
            className="img-replace"
            src={board1}
            alt="이미지"
            style={{ border: "1px solid black" }}
            />
          <div className="user-text">
            <p>{nowBoard?.writer}</p>
            <div>
              <span>{date.slice(0, 10)}</span>
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
              className="board-content-input"
              value={content}
              ref={contentRef}
              onChange={(e) => setContent(e.target.value)}
            />
          )}
        </div>
      </div>
      <BoardCommentList commentList={commentList} boardId={id} />
      <BoardCommentCreate boardId={id} />
    </div>
  );
};

export default BoardInfoPage;
