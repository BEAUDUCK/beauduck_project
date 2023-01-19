import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/button/Button';
import { axiosPostNewConsulting } from './ConsultingSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ConsultingModalCreate = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [limit, setLimit] = useState(10);
  
  const titleRef = useRef();

  const ConsultingCreate = (e) => {
    e.preventDefault();

    if (title.length < 1) {
      titleRef.current.focus();
      return ;
    }

    const newConsulting = {
      title,
      text: content,
      host: "유저네임",
      category: "consult",
    }

    dispatch(axiosPostNewConsulting(newConsulting));

    // 모달 닫기
  };

  return (
    <div className="consult-create-modal">
      <div>
        <p></p>
        <h3>방 생성하기</h3>
        <FontAwesomeIcon icon="xmark" className="xmark"/>
      </div>
      <form onSubmit={ConsultingCreate}>
        <label htmlFor="title">제목</label>
        <input ref={titleRef} id="title" type="text" value={title} onChange={e => setTitle(e.target.value)}/>
        <label htmlFor="limit">최대 입장 인원</label>
        <input id="limit" type="text" value={limit} onChange={e => setLimit(e.target.value)}/>
        <label htmlFor="content">소개</label>
        <textarea id="content" value={content} onChange={e => setContent(e.target.value)} />
        <Button text={"완료"} />
      </form>

    </div>
  )
};

export  default ConsultingModalCreate;