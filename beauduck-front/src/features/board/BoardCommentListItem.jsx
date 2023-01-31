import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeInfoComment, updateInfoComment } from './BoardSlice';

const BoardCommentListItem = ({ comment }) => {
  const dispatch = useDispatch();

  const [newComment, setNewComment] = useState(comment.content);
  const [isUpdate, setIsUpdate] = useState(false);
  const isToggleUpdate = () => {
    setIsUpdate(!isUpdate);
    setNewComment(comment.content);
  };
  const updateComment = () => {
    dispatch(updateInfoComment(newComment, comment.id));
  };

  const removeComment = () => {
    dispatch(removeInfoComment(newComment, comment.id));
  };

  return (
    <div className={['user-box', 'user-comment'].join(' ')}>
      <button className="comment-img" />
      <div className="user-text">
        <p className="comment-username">{comment.member_id}</p>
        {!isUpdate ? (
          <p className="comment-content">{comment.content}</p>
        ) : (
          <input
            className="comment-update-input"
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        )}
        <div className="comment-last">
          <div className="comment-last-sub">
            <span>{comment.created_at}</span>
            <span>좋아요</span>
            <span>{comment.like}</span>
          </div>
          <div className="comment-last-sub">
            {!isUpdate ? (
              <span className="comment-change" onClick={isToggleUpdate}>
                수정
              </span>
            ) : (
              <span className="comment-change" onClick={updateComment}>
                완료
              </span>
            )}
            {!isUpdate ? (
              <span className="comment-change" onClick={removeComment}>
                삭제
              </span>
            ) : (
              <span className="comment-change" onClick={isToggleUpdate}>
                취소
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCommentListItem;
