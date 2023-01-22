import { useParams } from 'react-router-dom';
import BoardCommentList from '../features/board/BoardCommentList';

const BoardInfoPage = () => {
  const { infoId } = useParams();
  // state에 저장된 board 값에서 infoId랑 같은거 가져오면됨
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
