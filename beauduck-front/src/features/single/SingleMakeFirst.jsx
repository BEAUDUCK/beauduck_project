import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitMakeup } from './SingleSlice';

const SingleMakeFirst = ({ sendFinalImg }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');
  const [duration, setDuration] = useState('');

  const titleRef = useRef();
  const contentRef = useRef();
  const imgRef = useRef();
  const durationRef = useRef();

  const submitFirst = () => {
    if (!title) {
      titleRef.current.focus();
      return;
    }
    if (!content) {
      contentRef.current.focus();
      return;
    }
    if (!img) {
      imgRef.current.focus();
      return;
    }
    if (!duration) {
      durationRef.current.focus();
      return;
    }

    sendFinalImg(img); // 이미지는 비직렬화라서 prop으로

    const payload = {
      title,
      content,
      duration,
    };

    dispatch(submitMakeup(payload)); // store에 저장
  };

  return (
    <div className="makeup-form">
      <div className="makeup-element">
        <label htmlFor="title" className="makeup-label">
          이름
        </label>
        <input
          ref={titleRef}
          type="text"
          id="title"
          className="makeup-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="makeup-element">
        <label htmlFor="content" className="makeup-label">
          내용
        </label>
        <textarea
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={['input-content', 'makeup-input'].join(' ')}
          type="text"
          id="content"
          maxLength={50}
        />
      </div>
      <div className="makeup-element">
        <label htmlFor="mainImg" className="makeup-label">
          대표사진
        </label>
        <input
          ref={imgRef}
          onChange={(e) => setImg(e.target.files[0])}
          className="main-img"
          type="file"
          id="mainImg"
          accept="image/*"
        />
      </div>
      <div className="makeup-element">
        <label htmlFor="time" className="makeup-label">
          소요시간
        </label>
        <input
          ref={durationRef}
          className="makeup-time"
          type="number"
          id="time"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <p>분</p>
      </div>
      <button onClick={submitFirst}>다음</button>
    </div>
  );
};

export default SingleMakeFirst;
