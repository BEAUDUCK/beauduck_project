import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import Button from '../../components/button/Button';

const TogetherModalCreate = ({ isOpenModal }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const titleRef = useRef();
  const contentRef = useRef();

  const isClose = () => {
    isOpenModal();
  };

  return (
    <div className="together-create-modal">
      <div className="consult-create-header">
        <h3>방 생성하기</h3>
        <FontAwesomeIcon onClick={isClose} icon="xmark" className="xmark" />
      </div>
      <form>
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
          <label htmlFor="content">소개</label>
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

export default TogetherModalCreate;
