import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeQaAnswer, updateQaAnswer } from './BoardSlice';

const BoardAnswerListItem = ({ answer, boardId }) => {
  const dispatch = useDispatch();
  const { memberId, nickName } = useSelector((state) => state.member);
  const [newAnswer, setNewAnswer] = useState(answer.content);
  const [isUpdate, setIsUpdate] = useState(false);
  const isToggleUpdate = () => {
    setIsUpdate(!isUpdate);
    setNewAnswer(answer.content);
  };

  const answerRef = useRef();

  const updateAnswer = () => {
    if (!newAnswer) {
      answerRef.current.focus();
    }

    const updatedAnswer = {
      boardQaEntity: {
        id: boardId,
      },
      content: newAnswer,
      isActive: true,
      memberEntity: {
        memberId,
      },
      writer: nickName,
    };
    const updatePayload = {
      updatedAnswer,
      answerId: answer.id,
    };
    dispatch(updateQaAnswer(updatePayload));
    setIsUpdate(!isUpdate);
  };

  const removeAnswer = () => {
    const removePayload = {
      boardId,
      answerId: answer.id,
    };
    dispatch(removeQaAnswer(removePayload));
  };
  const date = answer.created_date + '';

  return (
    <div className={['qna-board', 'qna-answer'].join(' ')}>
      <div className="alpha-mark">A</div>
      <div className={['user-box', 'user-comment'].join(' ')}>
        <button className="comment-img" />
        <div className="user-text">
          <p className="comment-username">{answer.writer}</p>
          <div className="comment-last">
            <div className="comment-last-sub">
              <span>{date.slice(0, 10)}</span>
              <span>좋아요</span>
              <span>{answer.likes}</span>
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
            ref={answerRef}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default BoardAnswerListItem;
