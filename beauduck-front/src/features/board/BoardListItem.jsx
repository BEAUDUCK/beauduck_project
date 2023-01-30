import { useNavigate } from 'react-router-dom';

const BoardListItem = ({ boardItem }) => {
  const navigate = useNavigate();
  return (
    <div
      className="board-list"
      onClick={() => navigate(`/board/info/${boardItem.id}`)}
    >
      <p>{boardItem.id}</p>
      <p className="board-title">{boardItem.title}</p>
      <p>{boardItem.member_id}</p>
      <p>{boardItem.count}</p>
      <p>{boardItem.like}</p>
    </div>
  );
};

export default BoardListItem;
