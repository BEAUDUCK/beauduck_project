import BoardCommentListItem from './BoardCommentListItem';

const BoardCommentList = ({ commentList, boardId }) => {
  return (
    <div className="comment-list">
      <h2>댓글</h2>
      {commentList?.map((item) => (
        <BoardCommentListItem key={item.id} comment={item} boardId={boardId} />
      ))}
    </div>
  );
};

export default BoardCommentList;
