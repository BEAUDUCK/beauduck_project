import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BoardCommentList from '../features/board/BoardCommentList';
import { getInfoBoard, getInfoComments } from '../features/board/BoardSlice';

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

  return (
    <div className="container">
      <div className="info-board">
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
      <BoardCommentList />
    </div>
  );
};

export default BoardInfoPage;
