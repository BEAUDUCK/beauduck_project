import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SingleMakeDetail from './SingleMakeDetail';
import SingleMakeFirst from './SingleMakeFirst';
import {
  createNewMakeup,
  saveMakeupImg,
  setBtnStateCreate,
} from './SingleSlice';

const SingleMake = ({ onToggleMake, onToggleFinish }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBtnStateCreate());
  }, []);

  const { memberId } = useSelector((state) => state.member);

  // 입력 페이지 이동
  const { completed } = useSelector((state) => state.single);

  // 이미지는 따로 처리
  const [imgForm, setImgForm] = useState('');
  let formData = new FormData();
  const getFinalImg = (img) => {
    formData.append('img', img);
    // console.log('폼', formData.get('img'));
    setImgForm({
      img: formData,
    });
  };

  const { title, content, duration } = useSelector((state) => state.single);
  const [makeupMainList, setMakeupMainList] = useState([]);

  // 마지막 !!!! (데이터 합산)
  const getMainList = (data) => {
    setMakeupMainList(data);
  };

  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      // 최초 렌더링에는 실행되지 않도록
      createMakeup();
      didMount.current = false;
    } else {
      didMount.current = true;
    }
  }, [makeupMainList]);

  const createMakeup = () => {
    const finalMakeup = {
      content,
      count: 0,
      duration,
      memberId,
      score: 0,
      img: '',
      title,
      makeupMainList,
    };

    dispatch(createNewMakeup(finalMakeup)).then((res) => {
      const payload = {
        id: res.payload,
        img: imgForm.img,
      };
      dispatch(saveMakeupImg(payload));
      onToggleFinish();
      onToggleMake();
    });
  };

  return (
    <div className="makeup-make">
      <h2>메이크업 만들기</h2>
      <p>TIP. 상세한 설명과 이미지, 색상이 있다면 아주 좋아요!</p>
      <FontAwesomeIcon onClick={onToggleMake} icon="xmark" className="xmark" />
      {!completed && (
        <>
          <SingleMakeFirst sendFinalImg={getFinalImg} />
        </>
      )}
      {completed && (
        <>
          <SingleMakeDetail getMakeupList={getMainList} />
        </>
      )}
    </div>
  );
};

export default SingleMake;
