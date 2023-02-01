import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeQaAnswer, updateQaAnswer } from './BoardSlice';

const BoardAnswerListItem = ({ answer }) => {
  const dispatch = useDispatch();

  const [newAnswer, setNewAnswer] = useState(answer.content);
  const [isUpdate, setIsUpdate] = useState(false);
  const isToggleUpdate = () => {
    setIsUpdate(!isUpdate);
    setNewAnswer(answer.content);
  };
  const updateAnswer = () => {
    dispatch(updateQaAnswer(newAnswer, answer.id));
  };

  const removeAnswer = () => {
    dispatch(removeQaAnswer(answer.id));
  };
  return (
    <div className={['qna-board', 'qna-answer'].join(' ')}>
      <div className="alpha-mark">A</div>
      <div className={['user-box', 'user-comment'].join(' ')}>
        <button className="comment-img" />
        <div className="user-text">
          <p className="comment-username">{answer.member_id}</p>
          <div className="comment-last">
            <div className="comment-last-sub">
              <span>{answer.created_at}</span>
              <span>좋아요</span>
              <span>{answer.like}</span>
            </div>
            <div className="comment-last-sub">
              {!isUpdate ? (
                <span className="comment-change" onClick={isToggleUpdate}>
                  수정
                </span>
              ) : (
                <span className="comment-change" onClick={updateAnswer}>
                  완료
                </span>
              )}
              {!isUpdate ? (
                <span className="comment-change" onClick={removeAnswer}>
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
        {!isUpdate ? (
          <p className="comment-content">{answer.content}</p>
        ) : (
          <textarea
            className="answer-update-input"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default BoardAnswerListItem;
