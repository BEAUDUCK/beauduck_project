import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newQaAnswer } from './BoardSlice';

const BoardAnswerCreate = ({ boardId }) => {
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState('');

  const AnswerSubmit = () => {
    const newAnswer = {
      board_id: boardId,
      member_id: '현재 유저 아이디',
      content: answer,
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
        onChange={(e) => setAnswer(e.target.value)}
      />
      <h5 className="answer-submit" onClick={AnswerSubmit}>
        등록
      </h5>
    </div>
  );
};

export default BoardAnswerCreate;
