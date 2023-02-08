import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button/Button';
import { postNewConsulting } from './ConsultingSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ConsultingModalCreate = (props) => {
  const dispatch = useDispatch();
  const { memberId, nickName } = useSelector((state) => state.member);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const titleRef = useRef();
  const contentRef = useRef();

  // 상위 컴포넌트로 props 이벤트 보내 모달 닫기
  const isClose = () => {
    props.isOpenModal();
  };

  const ConsultingCreate = (e) => {
    e.preventDefault();

    if (title.length < 1) {
      titleRef.current.focus();
      return;
    }
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    const newConsulting = {
      title,
      content,
      hostId: memberId,
      hostNickname: nickName,
    };

    dispatch(postNewConsulting(newConsulting));

    // 모달 닫기
    isClose();
  };

  return (
    <div className="consult-create-modal">
      <div className="consult-create-header">
        <p></p>
        <h3>방 생성하기</h3>
        <FontAwesomeIcon onClick={isClose} icon="xmark" className="xmark" />
      </div>
      <form onSubmit={ConsultingCreate}>
        <div>
          <label htmlFor="title">제목</label>
          <input
            ref={titleRef}
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">방 소개</label>
          <textarea
            ref={contentRef}
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button text={'완료'} />
      </form>
    </div>
  );
};

export default ConsultingModalCreate;
