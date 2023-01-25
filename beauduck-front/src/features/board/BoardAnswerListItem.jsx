const BoardAnswerListItem = ({ answer }) => {
  return (
    <div className={['qna-board', 'qna-answer'].join(' ')}>
      <div className="alpha-mark">A</div>
      <div className={['user-box', 'user-comment'].join(' ')}>
        <button className="comment-img" />
        <div className="user-text">
          <p className="comment-username">{answer.member_id}</p>
          <div>
            <span>{answer.created_at}</span>
            <span>좋아요</span>
            <span>{answer.like}</span>
          </div>
        </div>
        <p className="comment-content">{answer.content}</p>
      </div>
    </div>
  );
};

export default BoardAnswerListItem;
