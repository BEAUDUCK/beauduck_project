import { useNavigate } from 'react-router-dom';

const BoardListItem = ({ boardItem, idx, isInfo }) => {
  const navigate = useNavigate();

  const goToWhere = () => {
    if (isInfo) {
      navigate(`/board/info/${boardItem.id}`);
    } else {
      navigate(`/board/qna/${boardItem.id}`);
    }
  };
  return (
    <div className="board-list" onClick={goToWhere}>
      <p>{idx + 1}</p>
      <p className="board-title">{boardItem.title}</p>
      <p>{boardItem.writer}</p>
      {/* <p>{boardItem.count}</p>
      <p>{boardItem.likes}</p> 좋아요 삭제*/}
      <p></p>
      <p>{boardItem.count}</p>
    </div>
  );
};

export default BoardListItem;
