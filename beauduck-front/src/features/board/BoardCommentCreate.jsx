import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newInfoComment } from './BoardSlice';

const BoardCommentCreate = ({ boardId }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');

  const { memberId, name } = useSelector((state) => state.member);

  const CommentSubmit = () => {
    const newComment = {
      active: true,
      // boardEntity: {
      // },
      boardId,
      memberEntity: {
        memberId,
      },
      content: comment,
      writer: name,
    };
    console.log(newComment);

    setComment('');
    dispatch(newInfoComment(newComment));
  };

  return (
    <div className="comment-create">
      <p>닉네임</p>
      <div>
        <textarea
          type="text"
          className="comment-input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <span onClick={CommentSubmit} className="comment-submit-btn">
          등록
        </span>
      </div>
    </div>
  );
};

export default BoardCommentCreate;
