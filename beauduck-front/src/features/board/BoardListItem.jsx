const BoardListItem = ({ boardItem }) => {
  return (
    <div className="board-list">
      <p>{boardItem.id}</p>
      <p className="board-title">{boardItem.title}</p>
      <p>{boardItem.member_id}</p>
      <p>{boardItem.count}</p>
      <p>{boardItem.like}</p>
    </div>
  );
};

export default BoardListItem;
