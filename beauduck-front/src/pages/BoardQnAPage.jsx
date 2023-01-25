import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BoardAnswerCreate from '../features/board/BoardAnswerCreate';
import BoardAnswerList from '../features/board/BoardAnswerList';
import { getQaBoard, getQaComments } from '../features/board/BoardSlice';

const BoardQnAPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const { nowBoard } = useSelector((state) => state.nowBoard);

  useEffect(() => {
    dispatch(getQaBoard(id));
    dispatch(getQaComments(id));
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

  return (
    <div className={['container', 'container-colored'].join(' ')}>
      <div className="qna-board">
        <div className="alpha-mark">Q</div>
        <h1>{testBoard.title}</h1>
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
          <p>{testBoard.content}</p>
        </div>
      </div>
      <BoardAnswerList />
      <BoardAnswerCreate boardId={id} />
    </div>
  );
};

export default BoardQnAPage;
