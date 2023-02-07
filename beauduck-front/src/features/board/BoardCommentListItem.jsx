import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeInfoComment, updateInfoComment } from './BoardSlice';

const BoardCommentListItem = ({ comment, boardId }) => {
  const dispatch = useDispatch();
  const { memberId, nickName } = useSelector((state) => state.member);
  const [newComment, setNewComment] = useState(comment?.content);
  const [isUpdate, setIsUpdate] = useState(false);

  const commentRef = useRef();

  const isToggleUpdate = () => {
    setIsUpdate(!isUpdate);
    setNewComment(comment.content);
  };

  const updateComment = () => {
    if (!newComment) {
      commentRef.current.focus();
      return;
    }

    const updatedComment = {
      boardInfoEntity: {
        id: boardId,
      },
      content: newComment,
      isActive: true,
      memberEntity: {
        memberId: comment.memberId,
      },
      writer: nickName,
    };

    const updatePayload = {
      updatedComment,
      commentId: comment.id,
    };
    dispatch(updateInfoComment(updatePayload));
    setIsUpdate(!isUpdate);
  };

  const removeComment = () => {
    const removePayload = {
      boardId,
      commentId: comment.id,
    };
    dispatch(removeInfoComment(removePayload));
  };

  const date = comment.createdDate + '';

  return (
    <div className={['user-box', 'user-comment'].join(' ')}>
      <button className="comment-img" />
      <div className="user-text">
        <p className="comment-username">{comment?.writer}</p>
        {!isUpdate ? (
          <p className="comment-content">{comment?.content}</p>
        ) : (
          <input
            className="comment-update-input"
            type="text"
            ref={commentRef}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        )}
        <div className="comment-last">
          <div className="comment-last-sub">
            <span>{date.slice(0, 10)}</span>
          </div>
          {memberId === comment.memberId && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardCommentListItem;
