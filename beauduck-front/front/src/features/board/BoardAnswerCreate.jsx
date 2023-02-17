import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginAlert from '../../components/modal/LoginAlert';
import { newQaAnswer } from './BoardSlice';
import Swal from 'sweetalert2';

const BoardAnswerCreate = ({ boardId }) => {
  const dispatch = useDispatch();
  const answerRef = useRef();

  const [answer, setAnswer] = useState('');

  const { memberId, nickName } = useSelector((state) => state.member);
  const [isAlert, setIsAlert] = useState(false);
  const AnswerSubmit = () => {
    if (!memberId || memberId === undefined) {
      setIsAlert(!isAlert);
      return;
    }
    if (answer.length < 1) {
      answerRef.current.focus();
      return;
    }
    const newAnswer = {
      boardQaEntity: {
        id: boardId,
      },
      memberEntity: {
        memberId,
      },
      content: answer,
      isActive: true,
      writer: nickName,
    };
    dispatch(newQaAnswer(newAnswer));
    setAnswer('');
    // Swal.fire(
    //   "글이 등록되었습니다.",
    //   "",
    //   "success",
    // )
  };

  return (
    <div className={['qna-board', 'qna-answer-create'].join(' ')}>
      <h4 className="answer-ninkname">{nickName}</h4>
      <textarea
        ref={answerRef}
        type="text"
        className="answer-input"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <h5 className="answer-submit" onClick={AnswerSubmit}>
        등록
      </h5>
      {isAlert && <LoginAlert onClickEvent={() => setIsAlert(!isAlert)} />}
    </div>
  );
};

export default BoardAnswerCreate;
