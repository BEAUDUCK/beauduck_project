import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/button/Button';
import colorSelector from '../../assets/color-circle.png';
import { useState } from 'react';
import SingleModalCreateMain from './SingleModalCreateMain';
import { useDispatch, useSelector } from 'react-redux';
import { createNewMakeup, submitMakeup } from './SingleSlice';
import { useRef } from 'react';

const SingleModalCreate = ({ onToggleMake }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');
  const [duration, setDuration] = useState('');

  const titleRef = useRef();
  const contentRef = useRef();
  const imgRef = useRef();
  const durationRef = useRef();

  const completed = useSelector((state) => state.single.completed);

  // 데이터 취합
  const makeupMainList = [];
  const getSubAllData = ({ makeupMiddleList, main }) => {
    const makeupMainObject = {
      step: main[1],
      makeupMiddleList: makeupMiddleList,
    };

    makeupMainList.push(makeupMainObject);
  };

  // 완료 버튼 눌렀다
  const getMakeupData = () => {
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
    dispatch(submitMakeup());
    submitMakeupProcess();
    if (completed) {
      onToggleMake();
    }
  };

  const submitMakeupProcess = () => {
    const newProcess = {
      title,
      content,
      img,
      duration: parseInt(duration),
      memberId: 1, // 나중에 수정하자
      makeupMainList,
    };
    console.log(newProcess);
    dispatch(createNewMakeup(newProcess));
  };

  return (
    <div className="makeup-create-modal">
      <div className="modal-header">
        <p></p>
        <h3>새 메이크업 만들기</h3>
        <FontAwesomeIcon
          onClick={onToggleMake}
          icon="xmark"
          className="xmark"
        />
      </div>
      <div className="makeup-form">
        <div className="makeup-element">
          <label htmlFor="title" className="total-label">
            이름
          </label>
          <input
            ref={titleRef}
            type="text"
            id="title"
            className="total-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="makeup-element">
          <label htmlFor="content" className="total-label">
            내용
          </label>
          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={['input-content', 'total-input'].join(' ')}
            type="text"
            id="content"
            maxLength={50}
          />
        </div>
        <div className="makeup-element">
          <label htmlFor="mainImg" className="total-label">
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
          <label htmlFor="time" className="total-label">
            소요시간
          </label>
          <input
            ref={durationRef}
            className="input-time"
            type="number"
            id="time"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <p>분</p>
        </div>
        {/* 메이크업 과정 */}
        <div className="makeup-process">
          <SingleModalCreateMain
            main={['피부', 'skin']}
            getSubAllData={getSubAllData}
          />
          <hr className="makeup-hr" />
          <SingleModalCreateMain
            main={['눈썹', 'eyebrow']}
            getSubAllData={getSubAllData}
          />
          <hr className="makeup-hr" />
          <SingleModalCreateMain
            main={['눈', 'eye']}
            getSubAllData={getSubAllData}
          />
          <hr className="makeup-hr" />
          <SingleModalCreateMain
            main={['윤곽', 'conture']}
            getSubAllData={getSubAllData}
          />
          <hr className="makeup-hr" />
          <SingleModalCreateMain
            main={['입술', 'lip']}
            getSubAllData={getSubAllData}
          />
        </div>
        <Button text={'완료'} onClickEvent={getMakeupData} />
      </div>
    </div>
  );
};

export default SingleModalCreate;
