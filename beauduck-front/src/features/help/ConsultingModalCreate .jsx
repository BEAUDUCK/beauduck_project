import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button/Button';
import { postNewConsulting } from './ConsultingSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConsultingModalLoadingHost from './ConsultingModalLoadingHost';
import BlackOut from '../../components/blackout/BlackOut';

const ConsultingModalCreate = ({ isOpenModal }) => {
  const dispatch = useDispatch();
  const { memberId, nickName } = useSelector((state) => state.member);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const titleRef = useRef();
  const contentRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  // 새로운 컨설팅 룸 생성
  const ConsultingCreate = () => {
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
    isOpenModal();
  };

  return (
    <>
      <div className="consult-create-modal">
        <div className="consult-create-header">
          <p></p>
          <h3>방 생성하기</h3>
          <FontAwesomeIcon
            onClick={isOpenModal}
            icon="xmark"
            className="xmark"
          />
        </div>
        <div className="consult-form">
          <div>
            <label htmlFor="title">제목</label>
            <input
              ref={titleRef}
              id="title"
              type="text"
              value={title}
              maxLength={15}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="content">방 소개</label>
            <textarea
              ref={contentRef}
              id="content"
              value={content}
              maxLength={50}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button text={'완료'} onClickEvent={ConsultingCreate} />
        </div>
      </div>
    </>
  );
};

export default ConsultingModalCreate;
