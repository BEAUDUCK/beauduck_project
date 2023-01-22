import BoardCommentListItem from './BoardCommentListItem';
import './Board.style.scss';

const BoardCommentList = () => {
  const testComments = [
    {
      id: 1,
      member_id: 2,
      content: '오 굿',
      like: 2,
      created_at: '2023-01-22 17:54',
    },
    {
      id: 2,
      member_id: 2,
      content: '리얼리?',
      like: 5,
      created_at: '2023-01-22 17:55',
    },
  ];
  return (
    <div className="comment-list">
      <h2>댓글</h2>
      {testComments.map((item) => (
        <BoardCommentListItem key={item.id} comment={item} />
      ))}
    </div>
  );
};

export default BoardCommentList;
