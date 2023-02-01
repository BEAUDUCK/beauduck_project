import BoardCommentListItem from './BoardCommentListItem';

const BoardCommentList = ({ commentList }) => {
  return (
    <div className="comment-list">
      <h2>댓글</h2>
      {commentList?.map((item) => (
        <BoardCommentListItem key={item.id} comment={item} />
      ))}
    </div>
  );
};

export default BoardCommentList;
