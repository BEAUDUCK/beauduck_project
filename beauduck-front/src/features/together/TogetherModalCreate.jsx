import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import { getTogetherList, postNewTogether } from './TogetherSlice';
import TogetherModalHost from "./TogetherModalHost"

const TogetherModalCreate = ({ isOpenModal }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { memberId, nickName } = useSelector(state => state.member)
  const [isActive, setIsActive] = useState(false)

  const titleRef = useRef();
  const contentRef = useRef();

  const isClose = () => {
    isOpenModal();
  };

  const togetherCreate = () => {
    if (title.length < 1) {
      titleRef.current.focus();
      return
    }
    if (content.length < 1) {
      contentRef.current.focus()
      return
    }

    const newTogether = {
      title,
      content,
      hostId: memberId,
      hostNickname: nickName,
    }

    dispatch(postNewTogether(newTogether))
    dispatch(getTogetherList())
    setIsActive(!isActive)
  };

  return (
    <>
      <div className="together-create-modal">
        <div className="together-create-header">
          <h3>방 생성하기</h3>
          <FontAwesomeIcon onClick={isOpenModal} icon="xmark" className="xmark" />
        </div>
        <div className="together-form">
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
            <label htmlFor="content">소개</label>
            <textarea
              ref={contentRef}
              id="content"
              value={content}
              maxLength={50}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button text={'완료'} onClickEvent={togetherCreate} />
        </div>
      </div>
      {isActive && <TogetherModalHost />}
    </>
  );
};

export default TogetherModalCreate;
