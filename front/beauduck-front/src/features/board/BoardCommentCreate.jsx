import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newInfoComment } from './BoardSlice';
import LoginAlert from '../../components/modal/LoginAlert';

const BoardCommentCreate = ({ boardId }) => {
  const dispatch = useDispatch();
  const commentRef = useRef();

  const [comment, setComment] = useState('');

  const { memberId, nickName } = useSelector((state) => state.member);
  const [isAlert, setIsAlert] = useState(false);
  const CommentSubmit = () => {
    if (!memberId || memberId === undefined) {
      setIsAlert(!isAlert);
      return;
    }
    if (comment.length < 1) {
      commentRef.current.focus();
      return;
    }
    const newComment = {
      isActive: true,
      boardInfoEntity: {
        id: boardId,
      },
      memberEntity: {
        memberId,
      },
      content: comment,
      writer: nickName,
    };

    setComment('');
    dispatch(newInfoComment(newComment));
  };

  return (
    <div className="comment-create">
      <p>{nickName}</p>
      <div>
        <textarea
          ref={commentRef}
          type="text"
          className="comment-input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <span onClick={CommentSubmit} className="comment-submit-btn">
          등록
        </span>
      </div>
      {isAlert && <LoginAlert onClickEvent={() => setIsAlert(!isAlert)} />}
    </div>
  );
};

export default BoardCommentCreate;
