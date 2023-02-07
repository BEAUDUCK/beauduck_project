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

const SingleMake = ({ onToggleMake }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBtnStateCreate());
  }, []);

  const { memberId } = useSelector((state) => state.member);

  // 입력 페이지 이동
  const { completed } = useSelector((state) => state.single);

  // 이미지는 따로 처리
  const [img, setImg] = useState('');
  const formData = new FormData();
  const getFinalImg = (img) => {
    formData.append('img', img);
    // console.log(formData);
    const newImg = img;
    setImg(newImg);
  };

  const { title, content, duration } = useSelector((state) => state.single);

  const [makeupMainList, setMakeupMainList] = useState([]);

  // 마지막 !!!! (데이터 합산)
  const getMainList = (data) => {
    setMakeupMainList(data);
    // createMakeup()
  };

  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      createMakeup();
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
    console.log('finalMakeup', finalMakeup);

    // axios 요청 보내기...^^
    dispatch(createNewMakeup(finalMakeup)).then((res) => {
      console.log('res', res);
      const payload = {
        id: res.payload,
        img: formData,
      };
      console.log('payload', payload);
      dispatch(saveMakeupImg(payload));
    });
  };

  return (
    <div className="makeup-make">
      <h2>메이크업 만들기</h2>
      <p>TIP. 상세한 설명과 이미지, 색상이 있다면 아주 좋아요!</p>
      <FontAwesomeIcon onClick={onToggleMake} icon="xmark" className="xmark" />
      {!completed && (
        <>
          <SingleMakeFirst sendFinalImg={getFinalImg} formData={formData} />
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
