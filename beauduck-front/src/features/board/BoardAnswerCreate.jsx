import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newQaAnswer } from './BoardSlice';

const BoardAnswerCreate = ({ boardId }) => {
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState('');

  const { memberId, name } = useSelector((state) => state.member);

  const AnswerSubmit = () => {
    const newAnswer = {
      boardId,
      memberEntity: {
        memberId,
      },
      content: answer,
      isActive: true,
      writer: name,
    };

    dispatch(newQaAnswer(newAnswer));
    setAnswer('');
  };

  return (
    <div className={['qna-board', 'qna-answer-create'].join(' ')}>
      <h4 className="answer-ninkname">닉네임</h4>
      <textarea
        type="text"
        className="answer-input"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <h5 className="answer-submit" onClick={AnswerSubmit}>
        등록
      </h5>
    </div>
  );
};

export default BoardAnswerCreate;
