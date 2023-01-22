import '../../pages/Board.style.scss';

const BoardCommentListItem = ({ comment }) => {
  return (
    <div className={['user-box', 'user-comment'].join(' ')}>
      <button className="comment-img" />
      <div className="user-text">
        <p className="comment-username">{comment.member_id}</p>
        <p className="comment-content">{comment.content}</p>
        <div>
          <span>{comment.created_at}</span>
          <span>좋아요</span>
          <span>{comment.like}</span>
        </div>
      </div>
    </div>
  );
};

export default BoardCommentListItem;
