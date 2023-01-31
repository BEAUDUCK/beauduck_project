import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BlackOut from '../components/blackout/BlackOut';
import Button from '../components/button/Button';
import ExitModal from '../components/modal/ExitModal';
import BoardCommentCreate from '../features/board/BoardCommentCreate';
import BoardCommentList from '../features/board/BoardCommentList';
import {
  getInfoBoard,
  getInfoComments,
  RemoveInfoBoard,
  UpdateInfoBoard,
} from '../features/board/BoardSlice';

const BoardInfoPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const { nowBoard } = useSelector((state) => state.nowBoard);

  useEffect(() => {
    dispatch(getInfoBoard(id));
    dispatch(getInfoComments(id));
  }, [dispatch]);

  const testBoard = {
    id: 1,
    title: '글1',
    member_id: 4,
    content:
      '내용내용-sosdadkqweofkdl내용내용-sosdadkqweofkdl내용내용-sosdadkqweofkdl내용내용-sosdadkqweofkdl내용내용-sosdadkqweofkdl내용내용-sosdadkqweofkdl내용내용-sosdadkqweofkdl내용내용-sosdadkqweofkdl내용내용-sosdadkqweofkdl내용내용-sosdadkqweofkdl내용내용-sosdadkqweofkdl내용내용-sosdadkqweofkdl;',
    count: 4,
    like: 3,
    created_at: '2023-01-22 16:54',
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState(testBoard.title);
  const [content, setContent] = useState(testBoard.content);

  const onToggleUpdate = () => {
    setTitle(testBoard.title);
    setContent(testBoard.content);
    setIsUpdate(!isUpdate);
  };

  const updateBoard = () => {
    const updatedBoard = {
      title,
      content,
    };
    dispatch(UpdateInfoBoard(updatedBoard, testBoard.id));
    setIsUpdate(!isUpdate);
  };

  const [isRemove, setIsRemove] = useState(false);
  const onToggleRemove = () => {
    setIsRemove(!isRemove);
  };

  const removeBoard = () => {
    dispatch(RemoveInfoBoard(testBoard.id));
  };

  return (
    <div className={['container', 'container-colored'].join(' ')}>
      <div className="info-board">
        <div className="board-info-title">
          {!isUpdate ? (
            <h1>{testBoard.title}</h1>
          ) : (
            <input
              className="board-info-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
        </div>
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
        <div className="user-box">
          <button className="img-replace" />
          <div className="user-text">
            <p>{testBoard.member_id}</p>
            <div>
              <span>{testBoard.created_at}</span>
              <span>조회</span>
              <span>{testBoard.count}</span>
            </div>
          </div>
        </div>
        <div className="board-content">
          {!isUpdate ? (
            <p>{testBoard.content}</p>
          ) : (
            <textarea
              className="board-content-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          )}
        </div>
      </div>
      <BoardCommentList />
      <BoardCommentCreate boardId={id} />
    </div>
  );
};

export default BoardInfoPage;
